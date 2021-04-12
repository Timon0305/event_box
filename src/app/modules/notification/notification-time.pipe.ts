import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Constants } from '@app/config/constant';

@Pipe({
  name: 'notificationTime'
})
export class NotificationTimePipe implements PipeTransform {

  transform(value, ...args) {
    const notificationDate = moment(value);
    if (notificationDate.isSame(moment(), 'day')) {
      if (notificationDate.isBefore(moment().subtract(Constants.NOTIFICATION_DATE_TIME.hoursGap, 'hours'), 'hour')) {
        return notificationDate.fromNow();
      } else {
        return notificationDate.format(Constants.NOTIFICATION_DATE_TIME.timeFormat);
      }
    } else if (notificationDate.isSame(
      moment().subtract(Constants.NOTIFICATION_DATE_TIME.dateGap, 'day'), 'day')) {
      return Constants.NOTIFICATION_DATE_TIME.yesterday;
    } else if (notificationDate.isAfter(
      moment().subtract(Constants.NOTIFICATION_DATE_TIME.monthGap, 'month'), 'day')) {
      return notificationDate.format(Constants.NOTIFICATION_DATE_TIME.fullDateTime);
    } else {
      return notificationDate.format(Constants.NOTIFICATION_DATE_TIME.onlyDateFormat);
    }
  }

}
