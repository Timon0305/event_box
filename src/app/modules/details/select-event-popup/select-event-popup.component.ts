import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DetailApiService } from '../services/detail-api.service';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from '@app/core/services/loader.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { VariablePopupOpenService } from '../services/variable-popup-open.service';

@Component({
  selector: 'app-select-event-popup',
  templateUrl: './select-event-popup.component.html',
  providers: [DetailApiService]
})
export class SelectEventPopupComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  eventsUrl = Constants.ENDPOINTS.event;
  eventField: FormControl = new FormControl(null, Validators.compose([Validators.required]));
  @Input() varibaleApiParams: { category: string, event?: string, product: string, subCategory: string, vendor: string };
  @Input() categoryName;
  @Input() productAndVendorName;
  eventName;
  constructor(
    private readonly router: Router, private readonly detailService: DetailApiService,
    readonly activeModal: NgbActiveModal, private readonly modalService: NgbModal,
    private readonly loader: LoaderService, private readonly variablePopupOpen: VariablePopupOpenService) { }

  ngOnInit() {
  }

  getVariableInfo() {
    this.varibaleApiParams.event = this.eventField.value._id;
    this.eventName = this.eventField.value.name;
    this.loader.start();
    const { category, event, product } = this.varibaleApiParams;
    this.detailService.getPreQuoteDetails({ category, event, product }).pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.activeModal.close();
        this.loader.stop();
        const categoryAndEventName
          = { categoryName: this.categoryName, eventName: this.eventName };
        this.variablePopupOpen.openVaribalePopup({
          preQuoteDetails: res.data, categoryAndEventName,
          varibaleApiParams: this.varibaleApiParams,
          productAndVendorName: this.productAndVendorName,
          eventTimezone: this.eventField.value.eventTimezone
        });
      }, err => {
        this.loader.stop();
      });
  }

  navigateToEvent() {
    this.router.navigate(['/planner/event/add-event'], {
      queryParams:
      {
        redirectUri: `/details/${this.varibaleApiParams.product}`
      }
    }).then(() => {
      this.activeModal.close();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
