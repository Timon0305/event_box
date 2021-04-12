import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-verification-pending',
  templateUrl: './verification-pending.component.html',
})
export class VerificationPendingComponent implements OnInit {

  constructor(readonly activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
