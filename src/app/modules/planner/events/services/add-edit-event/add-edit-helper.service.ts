import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { CustomValidator } from '@app/core/validators/custom-validator';
import { validateGuestNumber } from '@app/core/validators/number-validator';
import { getCountryCodeAndPhone, updateValuesForEventUI } from '@app/core/utils/common.util';
import { currentDateTimezoneValidator } from '@app/core/validators/current-date-timezone.validator';
@Injectable()
export class AddEditHelperService {
  constructor(private readonly fb: FormBuilder) { }

  createForm() {
    return this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      label: ['', Validators.compose([Validators.required])],
      eventType: [null, Validators.compose([Validators.required])],
      startDate: [''],
      endDate: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      venueName: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      zipCode: ['', Validators.compose([Validators.required])],
      details: ['', Validators.compose([Validators.required])],
      guestCount: ['', Validators.compose([Validators.required, validateGuestNumber])],
      onSitePhone: [''],
      onSiteName: [''],
      deliveryStartDate: [null],
      deliveryEndDate: [null],
      setUpFromDate: [null],
      setUpToDate: [null],
      breakDownStartDate: [null],
      breakDownEndDate: [null],
      duplicateSetUp: [false],
      countryCode: [Constants.DEFAULT_COUNTRY_CODE],
      eventTimezone: [Constants.DEFAULT_TIME_ZONE, Validators.compose([Validators.required])],
    },
      {
        validator: [CustomValidator.matchStartEndDate.bind(this),
        CustomValidator.deliveryStartDate.bind(this),
        CustomValidator.setUpFromDate.bind(this),
        CustomValidator.breakDownStartDate.bind(this),

        ]
      });
  }

  patchProductForm(form, eventData, cond?) {
    Object.keys(form.controls).forEach(key => {
      if (cond === Constants.EDIT_DUPLICATE.duplicate) {
        const editDulicate = Constants.EDIT_DUPLICATE;
        const condition = (key !== editDulicate.name && key !== editDulicate.label &&
          key !== editDulicate.startDate && key !== editDulicate.endDate);
        if (eventData[key] && condition) {
          form.controls[key].setValue(eventData[key]);
          updateValuesForEventUI(form, eventData);
        }
      } else {
        form.controls[key].setValue(eventData[key]);
        updateValuesForEventUI(form, eventData);
      }

    });
    if (eventData.onSitePhone) {
      const { phone, countryCode } = getCountryCodeAndPhone(eventData.onSitePhone);
      form.controls.onSitePhone.setValue(phone);
      form.controls.countryCode.setValue(countryCode);
    }
  }

  setCustomValidator(addEventForm) {
    addEventForm.controls.startDate.setValidators(
      Validators.compose([Validators.required, currentDateTimezoneValidator(addEventForm)])
    );
    ['deliveryStartDate', 'deliveryEndDate', 'setUpFromDate', 'setUpToDate'].forEach(key => {
      addEventForm.controls[key].setValidators(
        Validators.compose([currentDateTimezoneValidator(addEventForm)])
      );
    });
    addEventForm.updateValueAndValidity();
  }
}
