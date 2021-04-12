import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-confirmation-popup',
  templateUrl: './shared-confirmation-popup.component.html',
})
export class SharedConfirmationPopupComponent implements OnInit {
  @Input() text;
  @Input() title;
  @Input() leftButton;
  @Input() rightButton;
  @Input() imageSrc;

  @Output() buttonAction = new EventEmitter();

  imageLoaded = false;
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit() {
  }

  imageLoad() {
    this.imageLoaded = true;
  }

}
