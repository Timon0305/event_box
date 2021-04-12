import { Pipe, PipeTransform } from '@angular/core';
import * as momentTimezone from 'moment-timezone';
import { Constants } from '@app/config/constant';

@Pipe({
  name: 'timezoneDateFormat'
})
export class TimezoneDateFormatPipe implements PipeTransform {

  transform(value, ...args) {
    return value ? momentTimezone(value).tz(args[0] || Constants.DEFAULT_TIME_ZONE).format('MMM DD, YYYY | hh:mm A') : '-';
  }

}
