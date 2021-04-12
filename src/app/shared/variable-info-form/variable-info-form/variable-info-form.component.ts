import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { checkDuplicateDate, modifyDatePickerMinByTimezone } from '@app/core/utils/common.util';
import { IDayCalendarConfig, DatePickerComponent } from 'ng2-date-picker';
import { Constants } from '@app/config/constant';
import { VariableFormHelperService } from '@app/shared/variable-info-popup/services/variable-form-helper.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-variable-info-form',
  templateUrl: './variable-info-form.component.html',
  styleUrls: ['./variable-info-form.component.scss'],
  providers: [VariableFormHelperService]
})
export class VariableInfoFormComponent implements OnInit {
  @Input() addEventForm: FormGroup;
  @Input() fromQuoteVariable;
  @ViewChild('deliveryStartDate', { static: false }) deliveryStartDate: DatePickerComponent;
  @ViewChild('deliveryEndDate', { static: false }) deliveryEndDate: DatePickerComponent;
  @ViewChild('setUpStartDate', { static: false }) setUpStartDate: DatePickerComponent;
  @ViewChild('setUpEndDate', { static: false }) setUpEndDate: DatePickerComponent;
  @ViewChild('brkDownStartDate', { static: false }) brkDownStartDate: DatePickerComponent;
  @ViewChild('brekDownEndDate', { static: false }) brekDownEndDate: DatePickerComponent;
  date;
  public dayPickerConfig = JSON.parse(JSON.stringify(Constants.DATE_PICKER_VALIDATIONS as IDayCalendarConfig));
  messageConst = Messages.VARIABLE_INFO_ERROR_TYPES;
  constructor(private readonly variableFormHelperService: VariableFormHelperService) { }

  ngOnInit() {
    this.checkSetUpEnable();
    this.startDateChanges();
    this.deliveryStartDateChanges();
    this.endDateChanges();
    this.changeConfigMin(Constants.DEFAULT_TIME_ZONE);
    this.addEventForm.controls.eventTimezone.valueChanges.subscribe(res => {
      this.changeConfigMin(res);
    });
  }

  changeConfigMin(timezone) {
    this.dayPickerConfig = modifyDatePickerMinByTimezone({
      configObjKey: Constants.QUOTE_VARIABLE_FIELDS,
      dayPickerConfig: this.dayPickerConfig, timezone
    });
  }

  startDateChanges() {
    if (this.addEventForm.controls.startDate) {
      this.addEventForm.controls.startDate.valueChanges.subscribe(res => {
        this.variableFormHelperService.changeDateValidationForStartDate(res, this.dayPickerConfig);
      });
    } else {
      this.addEventForm.controls.eventStartDate.valueChanges.subscribe(res => {
        this.variableFormHelperService.changeDateValidationForStartDate(res, this.dayPickerConfig);
      });
    }

  }

  deliveryStartDateChanges() {
    this.addEventForm.controls.deliveryStartDate.valueChanges.subscribe(res => {
      this.variableFormHelperService.validateWithDeliveryStartDate(res, this.dayPickerConfig);
    });
  }

  endDateChanges() {
    if (this.addEventForm.controls.endDate) {
      this.addEventForm.controls.endDate.valueChanges.subscribe(res => {
        this.variableFormHelperService.validateWithEndDate(res, this.dayPickerConfig);
      });
    } else {
      this.addEventForm.controls.eventEndDate.valueChanges.subscribe(res => {
        this.variableFormHelperService.validateWithEndDate(res, this.dayPickerConfig);
      });
    }
  }


  checkSetUpEnable() {
    if (!this.addEventForm.controls.duplicateSetUp.value && !this.checkDeliveryColoum()) {
      this.addEventForm.controls.duplicateSetUp.disable();
    } else {
      this.addEventForm.controls.duplicateSetUp.enable();
    }
  }

  openSeletedDatePicker(selectedDate) {
    this[selectedDate].api.open();
  }

  checkDeliveryColoum() {
    return this.addEventForm.controls.deliveryStartDate.value
      && this.addEventForm.controls.deliveryEndDate.value;
  }


  resetSetUpTime() {
    if (this.addEventForm.controls.duplicateSetUp.value) {
      this.patchSetUpValue(true);
    } else {
      this.patchSetUpValue(false);
    }
  }

  get checkEquality() {
    return checkDuplicateDate(this.addEventForm.controls);
  }

  patchSetUpValue(duplicate) {
    const formValue = this.addEventForm.controls;
    this.addEventForm.patchValue({
      setUpFromDate: duplicate ? formValue.deliveryStartDate.value : '',
      setUpToDate: duplicate ? formValue.deliveryEndDate.value : '',
    });
  }

}
