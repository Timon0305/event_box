import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RequestQuoteService } from '../service/request-quote.service';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Constants } from '@app/config/constant';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { LoaderService } from '@app/core/services/loader.service';


@Component({
  selector: 'app-request-quote',
  templateUrl: './request-quote.component.html',
  styleUrls: ['./request-quote.component.scss'],
  providers: [RequestQuoteService]
})
export class RequestQuoteComponent implements OnInit, OnDestroy {
  @Input() public quote;
  requestQuoteForm: FormGroup;
  readonly destroyed$ = new Subject();
  addionalProducts$;
  timezoneMap = Constants.TIME_ZONE_DISPLAY_MAP;

  constructor(
    private readonly helperService: RequestQuoteService,
    readonly activeModal: NgbActiveModal,
    private readonly flash: AlertService,
    private readonly loader: LoaderService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.getPublicProductServiceData(this.quote.products.company, this.quote.product);
  }

  initializeForm() {
    this.requestQuoteForm = this.helperService.createQuoteForm();
    this.helperService.patchQuoteForm(this.requestQuoteForm, this.quote);
  }

  getPublicProductServiceData(companyId, productID?: string) {
    this.addionalProducts$ = this.helperService.getAdditionalProducts({
      company: companyId,
      other: productID,
      size: Constants.PRODUCT_COUNT
    });
  }

  sendQuote() {
    this.loader.start();
    this.requestQuoteForm.value.additionalCharges.forEach((element, index) => {
      if (element.name === '') {
        this.requestQuoteForm.value.additionalCharges[index].name = null;
      }
      if (element.price === '') {
        this.requestQuoteForm.value.additionalCharges[index].price = null;
      }
    });

    if (this.quote.latestReply && !this.quote.wantCuonterOffer) {
      this.updateQuoteRequest();
    } else {
      this.makeQuoteRequest();
    }
  }

  updateQuoteRequest() {
    this.helperService.updateQuoteRequest(this.requestQuoteForm.value, this.quote._id, this.quote.latestReply._id)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.activeModal.close(res);
        this.loader.stop();
      }, error => {
        this.loader.stop();
      });
  }

  makeQuoteRequest() {
    this.helperService.sendQuoteRequest(this.requestQuoteForm.value, this.quote._id)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.activeModal.close(res);
        this.loader.stop();
      }, error => {
        this.loader.stop();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
