import { Component, OnInit, OnDestroy, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { AddEditCardDetailsService } from '../services/add-edit-card-details.service';
import { FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Router } from '@angular/router';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Messages } from '@app/config/messages';
import { Constants } from '@app/config/constant';
import { environment } from '@environments/environment';
import { filter } from 'rxjs/internal/operators/filter';
import { take } from 'rxjs/internal/operators/take';
import { IBasicUser } from '@app/models/IUserDetails';
import { RequestService } from '@app/core/http/request-service';
import { BreadCrumb } from '@app/config/breadcrumbs';

declare var Stripe;


@Component({
  selector: 'app-add-credit-card-details',
  templateUrl: './add-credit-card-details.component.html',
  styleUrls: ['./add-credit-card-details.component.scss']
})
export class AddCreditCardDetailsComponent implements OnInit, OnDestroy {
  public f: FormGroup;
  readonly destroyed$ = new Subject();
  vendorCreditCard = false;
  expirationYears: Array<number> = [];
  user;
  dynamicBreadcrumb = BreadCrumb.plannerAddCreditCard;
  constant = Constants;
  @Input() fromPayment: boolean;
  @Input() amountToPay;
  @Output() makePayment = new EventEmitter();
  paymentPage = true;
  subscriptionCancelled;
  constructor(
    private readonly addEditCardDetailsService: AddEditCardDetailsService,
    private readonly flash: AlertService,
    readonly router: Router, private readonly ngZone: NgZone,
    private readonly loader: LoaderService,
    private readonly sessionService: SessionManagerService,
    readonly requestService: RequestService
  ) { }

  ngOnInit() {
    this.getUserData();
    this.vendorCreditCard = this.router.url === Constants.APPLICATION_ROUTES.vendor.addCreditCard;
    this.createYearArray();
    this.initializeForm();

    Stripe.setPublishableKey(environment.social.stripePublishableKey);
  }

  getUserData() {
    this.sessionService.getUserData().pipe(takeUntil(this.destroyed$), filter(res => !!res)).subscribe(res => {
      this.user = res;
      if (this.user.company && this.user.company.memberPackage && this.user.company.memberPackage.subscriptionCancelled) {
        this.subscriptionCancelled = this.user.company.memberPackage.subscriptionCancelled;
      }
    });
  }

  createYearArray() {
    let currentYear = new Date().getFullYear();
    this.expirationYears.push(currentYear);
    while (this.expirationYears.length < Constants.MAX_YEARS_AHEAD_CARD_EXPIRE) {
      this.expirationYears.push(currentYear + 1);
      currentYear = currentYear + 1;
    }
  }

  initializeForm() {
    this.f = this.addEditCardDetailsService.createCardForm();
  }

  getToken() {
    this.loader.start();
    Stripe.card.createToken({
      name: this.f.value.cardHolderName,
      number: this.f.value.cardNumber,
      exp_month: this.f.value.month,
      exp_year: this.f.value.year,
      cvc: this.f.value.cvv,
      address_line1: this.f.value.address,
      address_city: this.f.value.city,
      address_state: this.f.value.state,
      address_zip: this.f.value.zipcode
    }, (status: number, response: object) => {
      this.ngZone.run(() => this.handleSuccess(response));

    });
  }

  handleSuccess(response) {
    if (response.error) {
      this.loader.stop();
      this.flash.showError(response.error.message);
    } else {
      if (this.fromPayment) {
        this.makePayment.emit(
          {
            amount: this.amountToPay,
            source: response.id,
            skipSave: true
          }
        );
      } else {
        this.addCard(response.id);
      }
    }
  }

  addCard(token) {
    this.addEditCardDetailsService.createCardDetails({ source: token })
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        if (this.vendorCreditCard) {
          this.paySubscriptionAndSetup(res);
        } else {
          this.loader.stop();
          this.sessionService.setProfileEvent(true);
          this.flash.showSuccess(Messages.SUCCESS.cardDetailCreated);
          this.router.navigate(['/planner/profile']);
        }
      }, error => {
        this.loader.stop();
        this.flash.showError(Messages.ERROR.apiError);
      });
  }

  paySubscriptionAndSetup(data) {
    const payload = {
      source: data.data.id,
      setupFee: this.user.company.memberPackage.setupFee,
      yearlySubscriptionFee: this.user.company.memberPackage.yearlySubscriptionFee
    };
    this.addEditCardDetailsService.payVendorSetupFees(payload)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.requestService.get<{ data: IBasicUser }>(Constants.ENDPOINTS.profile).pipe(take(1)).subscribe(userResp => {
          this.sessionService.setUserData(userResp.data);
          if (this.subscriptionCancelled) {
            this.router.navigate(['/vendor/dashboard']);
          } else {
            this.router.navigate([`${Constants.APPLICATION_ROUTES.vendor.addProductServices}`]);
          }
          this.loader.stop();
        });

      }, error => {
        this.loader.stop();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
