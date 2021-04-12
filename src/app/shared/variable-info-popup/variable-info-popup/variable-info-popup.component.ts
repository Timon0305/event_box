import { Component, OnInit, Input, OnDestroy, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { VariableFormHelperService } from '../services/variable-form-helper.service';
import { FormGroup } from '@angular/forms';
import { Messages } from '@app/config/messages';
import { Constants } from '@app/config/constant';
import { VariableInfoApiService } from '../services/variable-info-api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { LoaderService } from '@app/core/services/loader.service';
import { Router } from '@angular/router';
import { IDayCalendarConfig, DatePickerComponent } from 'ng2-date-picker';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-variable-info-popup',
  templateUrl: './variable-info-popup.component.html',
  styleUrls: ['./variable-info-popup.component.scss'],
  providers: [VariableFormHelperService, VariableInfoApiService]
})
export class VariableInfoPopupComponent implements OnInit, OnDestroy {
  variableInfo: FormGroup;
  date;
  readonly destroyed$ = new Subject();
  messageConst = Messages.VARIABLE_INFO_ERROR_TYPES;
  public dayPickerConfig = Constants.DATE_PICKER_VALIDATIONS as IDayCalendarConfig;
  isRequired = Messages.ERROR.isRequired;
  items: Array<{ [index: string]: string }> = [];
  @Input() preQuoteDetails;
  @Input() varibaleApiParams;
  @Input() categoryAndEventName;
  @Input() isEdit;
  @Input() quoteData;
  @Input() productAndVendorName;
  @Input() eventTimezone = Constants.DEFAULT_TIME_ZONE;
  @ViewChild('eventStartDate', { static: false }) eventStartDate: DatePickerComponent;
  @ViewChild('eventEndDate', { static: false }) eventEndDate: DatePickerComponent;
  timeZones = Constants.TIME_ZONES_LIST;
  constructor(
    @Inject(PLATFORM_ID) readonly platformId: object,
    private readonly loader: LoaderService, private readonly router: Router,
    private readonly formHelper: VariableFormHelperService, private readonly alert: AlertService,
    private readonly variableInfoApi: VariableInfoApiService, readonly activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.variableInfo = this.formHelper.buildForm();
    this.variableInfo.controls.eventTimezone.setValue(this.eventTimezone);
    this.getDropdownData();
    const payload = this.isEdit ? { ...this.quoteData.varriableInfo, notes: this.quoteData.notes, quantity: this.quoteData.quantity }
      : this.preQuoteDetails[Constants.DEFAULT_PREQUOTE_VARIABLE];
    this.formHelper.patchForm(this.variableInfo, { ...payload, eventTimezone: this.eventTimezone },
      { isEdit: this.isEdit, getDataFromValue: Constants.DEFAULT_PREQUOTE_VARIABLE });
  }

  variableTypeChanged(getDataFromVaribale?) {
    if (!getDataFromVaribale) {
      this.formHelper.resetForm(this.variableInfo);
    } else {
      this.formHelper.patchForm
        (this.variableInfo, { ...this.preQuoteDetails[getDataFromVaribale.value], eventTimezone: this.eventTimezone },
          { isEdit: this.isEdit, getDataFromValue: getDataFromVaribale.value });
    }
  }

  openSeletedDatePicker(selectedDate) {
    this[selectedDate].api.open();
  }

  getDropdownData() {
    if (!this.isEdit) {
      const keysArr = Object.keys(this.preQuoteDetails).filter(key => this.preQuoteDetails[key]);
      keysArr.forEach(variableKey => {
        switch (variableKey) {
          case Constants.VARIABLE_KEYS.lastQuoteVarriables:
            this.items.push({ text: Constants.getVariableDropDown().lastQuoteVarriables, value: variableKey });
            break;
          case Constants.VARIABLE_KEYS.eventVarriables:
            this.items.push(
              { value: variableKey, text: Constants.getVariableDropDown(this.categoryAndEventName.eventName).eventVarriables });
            break;
          case Constants.VARIABLE_KEYS.categoryQuoteVarriables:
            this.items.push({
              value: variableKey,
              text: Constants.getVariableDropDown(this.categoryAndEventName.categoryName).categoryQuoteVarriables
            });
            break;
        }
      });
    }
  }

  submit() {
    const { variableType, duplicateSetUp, ...payload } = this.variableInfo.value;
    this.loader.start();
    if (!this.isEdit) {

      this.addVariableInfo(payload);
    } else {
      this.updateVariableInfo(payload);
    }
  }

  addVariableInfo(payload) {
    this.variableInfoApi.addQuote(
      {
        ...payload, ...this.varibaleApiParams,
        eventTimezone: this.eventTimezone
      }).pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.alert.showSuccess(Messages.SUCCESS.quoteVarAdd);
        this.router.navigate(['/planner/quote-request-folder'])
          .then(() => {
            this.activeModal.close();
            this.loader.stop();
          });
      }, error => {
        this.alert.showError(error.error.message);
        this.loader.stop();
      });
  }

  updateVariableInfo(payload) {
    this.variableInfoApi.updateQuoteData(
      { ...payload, eventTimezone: this.eventTimezone },
      this.quoteData._id).pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.loader.stop();
        this.activeModal.close(true);
      }, error => this.loader.stop());
  }

  clickHandler(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
