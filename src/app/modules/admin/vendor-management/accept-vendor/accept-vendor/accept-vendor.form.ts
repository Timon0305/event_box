import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { dateFormatValidator } from '@app/core/validators/date-format.validator';
@Injectable()
export class AcceptVendorFormHelper {

  constructor(private readonly fb: FormBuilder) { }
  // function to build a reactive form
  buildForm() {
    return this.fb.group({
      commissionPercent: ['', [Validators.required,
      Validators.max(Constants.NUMBER.hundred),
      Validators.pattern(Constants.ACCEPT_VENDOR_FORM.FEE_PATTERN)]],
      yearlySubscriptionFee: [null, [Validators.pattern(Constants.ACCEPT_VENDOR_FORM.FEE_PATTERN)]],
      planFrequency: [null],
      startDate: [null, Validators.compose([dateFormatValidator])],
      setupFee: [null, [Validators.pattern(Constants.ACCEPT_VENDOR_FORM.FEE_PATTERN)]],
      terms_conditions: [{ value: '', disabled: true }],
      plannerCommission: [null, [Validators.pattern(Constants.ACCEPT_VENDOR_FORM.FEE_PATTERN)]]
    });
  }

  patchForm({ form, payload }) {
    form.patchValue({
      commissionPercent: payload.commissionPercent,
      yearlySubscriptionFee: payload.yearlySubscriptionFee,
      planFrequency: (payload.planFrequency ? payload.planFrequency.toString() : null),
      startDate: payload.startDate,
      setupFee: payload.setupFee,
      plannerCommission: payload.plannerCommission
    });
    if (!payload.startDate) {
      form.controls.yearlySubscriptionFee.setValue(null);
    }
  }

}
