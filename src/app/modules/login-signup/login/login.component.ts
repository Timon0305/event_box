import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '@app/config/constant';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constants = Constants;
  constructor(
    readonly modalService: NgbModal,
    readonly activeModal: NgbActiveModal,
    private readonly route: ActivatedRoute, private readonly router: Router
  ) { }

  ngOnInit() {
  }

  openModal(content, isVendor = false) {
    this.modalService.dismissAll();
    if (isVendor) {
      this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg', windowClass: 'vendor-signup-modal' });
    } else {
      const modalRef = this.modalService.open(content, { centered: true, windowClass: 'planner-signup-modal' });
      modalRef.result.catch(() => changeQueryParams({ redirectUri: null }, this.route, this.router));
    }
  }
}
