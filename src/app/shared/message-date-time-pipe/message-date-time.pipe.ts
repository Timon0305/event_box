import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'messageDateTime'
})
export class MessageDateTimePipe implements PipeTransform {

  transform(value, ...args) {
    const messageDate = moment(value);
    return messageDate.isSame(moment(), 'day') ? messageDate.format('hh:mm a') :
      (args[0] ? messageDate.format('MMM DD, hh:mm a') : messageDate.format('MMM DD'));
  }

}
