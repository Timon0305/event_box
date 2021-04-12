import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '@app/config/constant';
@Pipe({ name: 'formatPhone' })
export class FormatPhone implements PipeTransform {
    transform(value: string): string {
        if (value) {
            const splitPhoneArr = value.split(' ');
            let phone = '';
            let countryCode = '';
            if (splitPhoneArr.length > 1) {
                phone = splitPhoneArr[1];
                countryCode = splitPhoneArr[0];
            } else {
                phone = splitPhoneArr[0];
                if (phone.length > Constants.MAX_ONLY_PHONE_LENGTH) {
                    countryCode = phone.slice(0, phone.length - Constants.MAX_ONLY_PHONE_LENGTH);
                    phone = phone.slice(-Constants.MAX_ONLY_PHONE_LENGTH);
                }
            }
            phone = phone ?
                (`${phone.substring(0, Constants.PHONE_SLICE_FORMAT.middle)}\
                -${phone.substring(Constants.PHONE_SLICE_FORMAT.middle, Constants.PHONE_SLICE_FORMAT.high)}\
                -${phone.substring(Constants.PHONE_SLICE_FORMAT.high)}`)
                : '';
            if (countryCode) {
                phone = `${countryCode}-${phone}`;
            }
            return phone.replace(/[ ]+/gm, '');
        }
        return '-';
    }
}

