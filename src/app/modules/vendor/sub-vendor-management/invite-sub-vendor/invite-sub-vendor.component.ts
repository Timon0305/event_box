import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InviteSubVendorFormHelper } from './invite-sub-vendor.form';
import { FormGroup } from '@angular/forms';
import { SubVendorManagementService } from '../services/sub-vendor-management.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Constants } from '@app/config/constant';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-invite-sub-vendor',
  templateUrl: './invite-sub-vendor.component.html',
  styleUrls: ['./invite-sub-vendor.component.scss'],
  providers: [InviteSubVendorFormHelper, SubVendorManagementService]
})
export class InviteSubVendorComponent implements OnInit {
  inviteSubVendorForm: FormGroup;
  constructor(
    private readonly modalService: NgbModal,
    private readonly form: InviteSubVendorFormHelper,
    private readonly subVendorManagementService: SubVendorManagementService,
    private readonly flash: AlertService
  ) {
    this.inviteSubVendorForm = this.form.buildForm();
   }

  ngOnInit() {
  }

  close() {
    this.modalService.dismissAll();
  }

  get f() {
    return this.inviteSubVendorForm;
  }

  inviteSubVendor() {
    this.subVendorManagementService.inviteSubVendor(this.inviteSubVendorForm.value).subscribe(
      res => {
        this.modalService.dismissAll();
        this.flash.showSuccess(Messages.SUCCESS.invitationSent);
      },
      error => {
        this.flash.showError(Messages.ERROR.emailAlreadyExists);
      }
    );
  }
}
