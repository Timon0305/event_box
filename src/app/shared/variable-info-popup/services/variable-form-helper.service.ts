import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { CustomValidator } from '@app/core/validators/custom-validator';
import { minNumberValidator } from '@app/core/validators/min-number.validator';
import { updateValuesForEventUI } from '@app/core/utils/common.util';

@Injectable()
export class VariableFormHelperService {

  constructor(private readonly fb: FormBuilder) { }
  // function to build a reactive form
  buildForm() {
    return this.fb.group({
      duplicateSetUp: [false],
      variableType: [Constants.DEFAULT_PREQUOTE_VARIABLE],
      quantity: ['', Validators.compose([Validators.required, minNumberValidator])],
      notes: ['', [Validators.required]],
      eventStartDate: ['', Validators.compose([Validators.required])],
      eventEndDate: ['', Validators.compose([Validators.required])],
      deliveryStartDate: ['', Validators.compose([Validators.required])],
      deliveryEndDate: ['', Validators.compose([Validators.required])],
      setUpFromDate: ['', Validators.compose([Validators.required])],
      setUpToDate: ['', Validators.compose([Validators.required])],
      breakDownStartDate: ['', Validators.compose([Validators.required])],
      breakDownEndDate: ['', Validators.compose([Validators.required])],
      eventTimezone: [{value: null, disabled: true}, Validators.required]
    },
      {
        validator: [
          CustomValidator.matchEventStartEndDate.bind(this),
          CustomValidator.deliveryStartDate.bind(this),
          CustomValidator.setUpFromDate.bind(this),
          CustomValidator.breakDownStartDate.bind(this),
        ]
      });
  }

  patchForm(form: FormGroup, value, { isEdit, getDataFromValue }) {
    Object.keys(form.controls).forEach(key => {
      if ((Constants.VARIABLE_INFO_READ_ONLY_FIELDS.indexOf(key) < 0)
        || getDataFromValue === Constants.VARIABLE_KEYS.eventVarriables || isEdit) {
        if (value[key]) {
          form.controls[key].setValue(value[`${key}`]);
          updateValuesForEventUI(form, value);
        } else if (key !== 'variableType') {
          form.controls[key].setValue(null);
        }
      }
    });
    form.controls.eventEndDate.markAsTouched();
  }

  validateWithDeliveryStartDate(res, dayPickerConfig) {
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.setUpFromDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.setUpFromDate],
      min: res,
    };
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.setUpToDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.setUpToDate],
      min: res,
    };
  }

  changeDateValidationForStartDate(res, dayPickerConfig) {
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.endDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.endDate],
      min: res,
    };
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.eventEndDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.eventEndDate],
      min: res,
    };
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.deliveryStartDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.deliveryStartDate],
      max: res,
    };
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.deliveryEndDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.deliveryEndDate],
      max: res,
    };
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.setUpToDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.setUpToDate],
      max: res,
    };
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.setUpFromDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.setUpFromDate],
      max: res,
    };
    return;
  }
  validateWithEndDate(res, dayPickerConfig) {
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.breakDownStartDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.breakDownStartDate],
      min: res,
    };
    dayPickerConfig[Constants.EVENT_DATE_VALIDITY.breakDownEndDate] = {
      ...dayPickerConfig[Constants.EVENT_DATE_VALIDITY.breakDownEndDate],
      min: res,
    };
  }

  resetForm(form: FormGroup) {
    form.patchValue({
      duplicateSetUp: false,
      variableType: null,
      quantity: null,
      notes: '',
      deliveryStartDate: null,
      deliveryEndDate: null,
      setUpFromDate: null,
      setUpToDate: null,
      breakDownStartDate: null,
      breakDownEndDate: null

    });
  }
}
