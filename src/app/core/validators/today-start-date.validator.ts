import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';
export function todayStartDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && moment(control.value, 'MM-DD-YYYY hh:mm a').isBefore(moment(), 'minute')) {
        return {
            invalid: true
        };
    }
    return null;
}
