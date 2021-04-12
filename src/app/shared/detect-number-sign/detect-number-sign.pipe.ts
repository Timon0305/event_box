import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detectNumberSign'
})
export class DetectNumberSignPipe implements PipeTransform {

  transform(value) {
    return Number(value) < 0 ? value : (Number(value) === 0 ? 0 : `+${value}`);
  }

}
