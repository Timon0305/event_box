import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { CustomValidator } from '@app/core/validators/custom-validator';

@Injectable()
export class PromoCodeSaveFormHelper {

  constructor(private readonly fb: FormBuilder) { }
  private promoCodeForm: FormGroup;
  // function to build a reactive form
  buildForm() {
    this.promoCodeForm = this.fb.group({
      promoCodeType: [''],
      promoCodeValue: ['', [Validators.required, this.customValidator.bind(this)]],
      promoCodeThreshold: ['', [Validators.required, this.customValidator.bind(this)]],
      promoCodeTitle: ['', [Validators.required]],
      associatedVendors: ['', [Validators.required]],
      promoCodeStartDate: ['', Validators.compose([Validators.required])],
      promoCodeEndDate: ['', Validators.compose([Validators.required])],
      termsNConditions: ['', []]
    },
      {
        validator: [CustomValidator.matchPromoCodeStartEndDate.bind(this)]
      });
    return this.promoCodeForm;
  }

  customValidator() {
    if (!this.promoCodeForm) {
      return { customThreshold: false };
    }
    const promoCodeValue = this.promoCodeForm.get('promoCodeValue');
    const promoCodeThreshold = this.promoCodeForm.get('promoCodeThreshold');
    this.setBlankErrors(promoCodeThreshold);
    this.setBlankErrors(promoCodeValue);
    const promoCodeType = this.promoCodeForm.get('promoCodeType');
    const promoCodeValueVal = promoCodeValue ? +promoCodeValue.value : '';
    const promoCodeThresholdVal = promoCodeThreshold ? +promoCodeThreshold.value : '';
    const promoCodeTypeVal = promoCodeType ? promoCodeType.value : '';
    if (promoCodeValueVal > Constants.NUMBER.hundred && promoCodeTypeVal === Constants.PROMO_CODE.PERCENT) {
      return { invalidPercent: true };
    }
    return this.checkThreshold({ promoCodeValueVal, promoCodeThresholdVal, promoCodeTypeVal });
  }

  setBlankErrors(formField) {
    const errType = ['customOrderAbove', 'invalidPercent', 'customThreshold'];
    errType.forEach((element) => {
      if (formField && formField.getError(element)) {
        formField.setErrors(null);
      }
    });
  }

  checkThreshold({ promoCodeValueVal, promoCodeThresholdVal, promoCodeTypeVal }) {
    return promoCodeValueVal && promoCodeThresholdVal &&
      (promoCodeValueVal > promoCodeThresholdVal && promoCodeTypeVal === Constants.PROMO_CODE.AMOUNT)
      && { customThreshold: true, customOrderAbove: true };
  }
}


