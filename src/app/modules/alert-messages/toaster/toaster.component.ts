import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html'
})
export class ToasterComponent implements OnInit {

  constructor(public readonly alertService: AlertService) { }

  ngOnInit() {
  }

  close(type: boolean) {
    if ( type ) {
      this.alertService.isSucessShown = false;
    } else {
      this.alertService.isErrorShown = false;
    }
  }

}
