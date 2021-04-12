import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
@Directive({
  selector: '[appNotificationDate]'
})
export class NotificationDateDirective implements OnInit {
  @Input() innerHtml;
  constructor(private readonly el: ElementRef) {
  }

  ngOnInit() {
    const container = document.createElement('ng-container');
    container.innerHTML = this.innerHtml;
    const elementWithDate = container.getElementsByClassName('local-date');
    if (elementWithDate.length) {
      Object.keys(elementWithDate).forEach(key => {
        if (elementWithDate[key]) {
          const date = elementWithDate[key].innerText;
          elementWithDate[key].innerText = moment(date).format('MMM DD, YYYY hh:mm A');
        }
      });
      this.el.nativeElement.innerHTML = container.innerHTML;
    } else {
      this.el.nativeElement.innerHTML = this.innerHtml;
    }
  }

}
