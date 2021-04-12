import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-user-type',
  templateUrl: './select-user-type.component.html',
  styleUrls: ['./select-user-type.component.scss']
})
export class SelectUserTypeComponent implements OnInit {
  role = 'vendor';
  @Output() userRole = new EventEmitter();

  constructor(readonly activeModal: NgbActiveModal) { }

  ngOnInit() {}

  changeRole(role) {
    this.role = role;
  }

  close() {
    this.userRole.emit(this.role);
    this.activeModal.close();
  }
}
