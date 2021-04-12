import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'eventDate'
})
export class EventDatePipe implements PipeTransform {

  transform(value) {
    return value ? moment(value).format('MMM DD, YYYY | hh:mm A') : '-';
  }

}
