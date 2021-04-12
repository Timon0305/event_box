import { AbstractControl } from '@angular/forms';

export function priceValidator(control: AbstractControl): { [key: string]: boolean } | null {

  if ((control.value || control.value === 0) && Number(control.value) < 0) {
    return { priceZero: true };
  }
  return null;
}
