
import { AbstractControl } from '@angular/forms';
import { Constants } from '@app/config/constant';


export function validateGuestNumber(control: AbstractControl): { [key: string]: boolean } | null {
  if ((control.value || control.value === 0) && (control.value > Constants.EVENT_FORM.guestNumber ||
    control.value <= 0)) {
    return { guestCount: true };
  }

  return null;
}
