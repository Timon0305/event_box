
import { AbstractControl } from '@angular/forms';
import { Constants } from '@app/config/constant';

export function youtubeUrlValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value) {
        if (control.value.match(Constants.YOU_TUBE_URL_REGEX)) {
            return null;
        }
        return { invalidUrl: true };
    }
    return null;
}
