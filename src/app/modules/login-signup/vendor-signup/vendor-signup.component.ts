import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginSignupService } from '../services/login-signup.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '@app/config/constant';
import { IBasicUser } from '@app/models/IUserDetails';
import { updateSignupForm } from '@app/core/utils/form.util';
import { Messages } from '@app/config/messages';
import { LoaderService } from '@core/services/loader.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { ISocialUser } from '@app/models/ISocialUser';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { changeQueryParams } from '@app/core/utils/common.util';

@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.scss']
})
export class VendorSignupComponent implements OnInit, OnDestroy {
  @Input() socialUser: ISocialUser;
  @Input() email;
  referredBy;
  errorMesages = Messages.ERROR;
  maxLength = Constants.signupForm.maxLength;
  vendor = Constants.Role.VENDOR;
  passwordType = Constants.passwordType;
  private readonly destroyed$ = new Subject();
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    readonly loginSignupService: LoginSignupService, readonly modalService: NgbModal,
    readonly alertService: AlertService, readonly sessionService: SessionManagerService,
    readonly activeModal: NgbActiveModal, readonly loader: LoaderService) { }
  vendorSignupForm: FormGroup;
  @Input() fromLogin: boolean;
  @Input() userData: IBasicUser;
  ngOnInit() {
    this.referredBy = this.route.snapshot.queryParams.referredBy;
    this.vendorSignupForm = this.loginSignupService.createVendorSignupForm();
    this.loginSignupService.setEmailControl(this.vendorSignupForm, this.email);
    if (this.fromLogin) {
      this.vendorSignupForm.reset();
      updateSignupForm(this.vendorSignupForm, this.userData);
    } else if (this.socialUser) {
      this.vendorSignupForm.reset();
      updateSignupForm(this.vendorSignupForm, this.socialUser);
    }
  }

  get f() {
    return this.vendorSignupForm;
  }

  vendorSignup() {
    const formData = { ...this.vendorSignupForm.value };
    if (!formData.accountType) {
      delete formData.accountType;
      delete formData.token;
    }
    const { website, instagram, facebook } = this.vendorSignupForm.value;
    if (!(website || instagram || facebook)) {
      this.alertService.showError(this.errorMesages.atleastOneWebAddress);
    } else {
      let payload = { ...formData, role: Constants.Role.VENDOR };
      payload = this.fromLogin ? { ...payload, googleId: this.userData.googleId } : payload;
      this.loader.start();
      this.loginSignupService.vendorSignup(payload, this.referredBy).pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.modalService.dismissAll();
        this.loader.stop();
        this.loginSignupService.openVerificationPending();
      }, error => {
        this.loader.stop();
        this.alertService.showError(error.error.message);
      });
    }
  }

  signin(content) {
    this.modalService.dismissAll();
    this.modalService.open(content, { centered: true, windowClass: 'login-full-modal' });
  }

  dismiss() {
    this.modalService.dismissAll();
    this.updateQueryParams();
  }
  updateQueryParams() {
    changeQueryParams({ referredBy: null }, this.route, this.router);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
