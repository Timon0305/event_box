import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-associate-vendors',
  templateUrl: './associate-vendors.component.html'
})
export class AssociateVendorsComponent implements OnInit {

  @Input() associateVendors;
  constructor(
    private readonly activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.close();
  }

}
