import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as momentTimezone from 'moment-timezone';
import { Constants } from '@app/config/constant';

export function currentDateTimezoneValidator(form): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const offset = momentTimezone.tz(form.value.eventTimezone).format('Z');
    if (control.value && form.value.eventTimezone &&
      momentTimezone(momentTimezone(control.value, Constants.DATE_PICKER_CONFIG.format)
        .utcOffset(offset, true)).isBefore(momentTimezone(), 'minute')) {
      return {
        invalid: true
      };
    }
    return null;
  };
}