import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Constants } from '@app/config/constant';

@Pipe({name: 'formatDate'})
export class FormatDate implements PipeTransform {
  transform(value: string): string {
    return value ? moment(value).format(Constants.DISPLAY_DATE_FORMAT) : '-';
  }
}

