import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';
export function eventEndDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && (moment(control.value).isBefore(moment(), 'date') ||
        moment(control.value).isSame(moment(), 'date'))) {
        return { mustBeAfterCurrentDate: true };
    }
    return null;
}
