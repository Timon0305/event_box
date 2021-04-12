import { AbstractControl } from '@angular/forms';

export function minNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if ((control.value && control.value < 0) || control.value === 0) {
        return { invalidNumber: true };
    }
    return null;
}
