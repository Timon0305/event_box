import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { Constants } from '@app/config/constant';
import * as moment from 'moment';
import { compareDates, compareTime } from '../utils/common.util';


export class CustomValidator {
  static matchPassword(form: FormGroup) {
    let password = '';
    const confirmPassword = form.controls.passwordConfirmation.value || '';
    if (form.get('password')) {
      password = form.controls.password.value;
    }
    if (form.get('newPassword')) {
      password = form.controls.newPassword.value;
    }
    if (confirmPassword.length <= 0) {
      return null;
    }
    if (confirmPassword !== password) {
      return {
        mismatch: true
      };
    }
    return null;
  }

  static validateCVV(controls: AbstractControl): ValidationErrors | null {
    if (
      (controls.value || controls.value === 0)
      &&
      (
        controls.value > Constants.CARD_ADD_VALIDATIONS.maxCvvLength
        ||
        controls.value <= 0)
    ) {
      return { cvvCount: true };
    }

    return null;
  }
  static validMonthYear(form: FormGroup) {
    const month = form.controls.month.value;
    const year = form.controls.year.value || '';
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (month <= 0) {
      return null;
    }
    if (Number(year) === Number(currentYear) && Number(month) < Number(currentMonth)) {
      return {
        misMatchMonth: true
      };
    }
    return null;
  }

  static matchOldPassword(form: FormGroup) {
    if (form.controls.oldPassword.value && form.controls.newPassword.value &&
      form.controls.oldPassword.value === form.controls.newPassword.value) {
      return { oldPasswordMatch: true };
    }
    return null;
  }

  static validEmail(controls: AbstractControl): ValidationErrors | null {
    const email = controls.value;
    if (email === '' && email.length <= 0) {
      return null;
    }
    if (/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
      return null;
    } else {
      return {
        invalidEmail: true
      };
    }
  }

  static noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  static matchAccountNumber(form: FormGroup) {
    const accountNumber = form.controls.account_number.value;
    const confirmAccount = form.controls.cnfirmAccNumber.value || '';
    if (confirmAccount.length <= 0) {
      return null;
    }
    if (confirmAccount !== accountNumber) {
      return {
        mismatchAccount: true
      };
    }
    return null;
  }
  static matchRoutingNumber(form: FormGroup) {
    const routingNumber = form.controls.routing_number.value;
    const confirmRoutingNumber = form.controls.confirmRoutingNumber.value || '';
    if (confirmRoutingNumber.length <= 0) {
      return null;
    }
    if (routingNumber !== confirmRoutingNumber) {
      return {
        mismatchRouterNumber: true
      };
    }
    return null;
  }

  static matchStartEndDate(form: FormGroup) {
    const startDate = new Date(form.controls.startDate.value);
    const endDate = form.controls.endDate.value ? new Date(form.controls.endDate.value) : '';
    if (!endDate) {
      return null;
    }
    if (moment(endDate).isBefore(startDate)) {
      return {
        startDate: true
      };
    }
    return null;
  }

  static matchPromoCodeStartEndDate(form: FormGroup) {
    const promoCodeStartDate = new Date(form.controls.promoCodeStartDate.value);
    const promoCodeEndDate = form.controls.promoCodeEndDate.value ? new Date(form.controls.promoCodeEndDate.value) : '';
    if (!promoCodeEndDate) {
      return null;
    }
    if (moment(promoCodeEndDate).isBefore(promoCodeStartDate)) {
      return {
        promoCodeStartDate: true
      };
    }
    return null;
  }

  static matchEventStartEndDate(form: FormGroup) {
    const startDate = new Date(form.controls.eventStartDate.value);
    const endDate = form.controls.eventEndDate.value ? new Date(form.controls.eventEndDate.value) : '';
    if (!endDate) {
      return null;
    }
    if (moment(endDate).isBefore(startDate)) {
      return {
        startDate: true
      };
    }
    return null;
  }

  static deliveryStartDate(form: FormGroup) {
    const startDeliveryDate = new Date(form.controls.deliveryStartDate.value);
    const endDeliveryDate = form.controls.deliveryEndDate.value ? new Date(form.controls.deliveryEndDate.value) : '';
    if (!endDeliveryDate) {
      return null;
    }
    if (moment(endDeliveryDate).isBefore(startDeliveryDate)) {
      return {
        deliveryStartDate: true
      };
    }
    return null;
  }

  static setUpFromDate(form: FormGroup) {
    const setUpStartDate = new Date(form.controls.setUpFromDate.value);
    const setUpEndDate = form.controls.setUpToDate.value ? new Date(form.controls.setUpToDate.value) : '';
    if (!setUpEndDate) {
      return null;
    }
    if (moment(setUpEndDate).isBefore(setUpStartDate)) {
      return {
        setUpFromDate: true
      };
    }
    return null;
  }

  static breakDownStartDate(form: FormGroup) {
    const breakDownStartDate = new Date(form.controls.breakDownStartDate.value);
    const breakDownEndDate = form.controls.breakDownEndDate.value ? new Date(form.controls.breakDownEndDate.value) : '';
    if (!breakDownEndDate) {
      return null;
    }
    if (moment(breakDownEndDate).isBefore(breakDownStartDate)) {
      return {
        breakDownStartDate: true
      };
    }
    return null;
  }

  static matchTaxId(form: FormGroup) {
    const taxId = form.controls.tax_id.value;
    const confirmTaxId = form.controls.confirmTaxId.value || '';
    if (confirmTaxId.length <= 0) {
      return null;
    }
    if (taxId !== confirmTaxId) {
      return {
        mismatchTaxId: true
      };
    }
    return null;

  }

  static matchEventTime(form: FormGroup) {
    if (compareDates('eventStartDate', 'eventEndDate', form)
      && compareTime('eventStartTime', 'eventEndTime', form)) {
      return { eventStartTime: true };
    }
    return null;
  }

  static matchSetupTime(form: FormGroup) {
    if (compareDates('setUpFromDate', 'setUpToDate', form)
      && compareTime('setUpStartTime', 'setUpEndTime', form)) {
      return { setUpStartTime: true };
    }
    return null;
  }

  static matchDeliveryTime(form: FormGroup) {
    if (compareDates('deliveryStartDate', 'deliveryEndDate', form)
      && compareTime('deliveryStartTime', 'deliveryEndTime', form)) {
      return { deliveryStartTime: true };
    }
    return null;
  }



  static matchBreakDownTime(form: FormGroup) {
    if (compareDates('breakDownStartDate', 'breakDownEndDate', form)
      && compareTime('breakDownStartTime', 'breakDownEndTime', form)) {
      return { breakDownStartTime: true };
    }
    return null;
  }

}
