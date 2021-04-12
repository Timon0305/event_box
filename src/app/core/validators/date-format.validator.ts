

import { AbstractControl } from '@angular/forms';
import { Constants } from '@app/config/constant';
import * as moment from 'moment';
export function dateFormatValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return (control.value &&
        (!(moment(control.value, Constants.DATE_CONFIG.format, true).isValid()))
        ||
        moment(control.value, Constants.DATE_CONFIG.format, true).isBefore(moment(), 'date')
    ) ?
        { invalidFormat: true }
        : null;
}

