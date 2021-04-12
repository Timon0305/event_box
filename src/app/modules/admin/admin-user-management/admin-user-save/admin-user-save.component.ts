import { Component, OnInit } from '@angular/core';

import { AdminUserSaveFormHelper } from './admin-user-save.form';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { AdminUserManagementService } from '../services/admin-user-management.service';
import { Messages } from '@app/config/messages';
import { getCountryCodeAndPhone } from '@app/core/utils/common.util';


@Component({
  selector: 'app-admin-user-save',
  templateUrl: './admin-user-save.component.html',
  styleUrls: ['./admin-user-save.component.scss'],
  providers: [AdminUserSaveFormHelper, AdminUserManagementService]
})
export class AdminUserSaveComponent implements OnInit {
  saveAdminUserForm: FormGroup;
  userId: string;
  editForm = false;
  addFixedFooterClassSidebar = true;
  constructor(
    private readonly formHelper: AdminUserSaveFormHelper,
    private readonly adminUserManagementService: AdminUserManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly flash: AlertService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.saveAdminUserForm = this.formHelper.buildForm();
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.id;
      if (this.userId) {
        this.editForm = true;
        this.adminUserManagementService.getAdminUser(this.userId).subscribe(
          data => {
            const { phone, countryCode } = getCountryCodeAndPhone(data.phone);
            data = {...data, phone, countryCode};
            this.saveAdminUserForm.patchValue(data);
          }
        );
      }
    });
  }

  get f() {
    return this.saveAdminUserForm;
  }

  addAdminUser() {
    this.loaderService.start();
    const data = this.saveAdminUserForm.value;
    this.adminUserManagementService.addAdminUser(data).subscribe(
      res => {
        this.flash.showSuccess(Messages.SUCCESS.adminUserAdded);
        this.loaderService.stop();
        this.router.navigateByUrl('/admin/user-management');
      },
      err => {
        this.loaderService.stop();
      }
    );
  }
  updateAdminUser() {
    this.loaderService.start();
    const data = this.saveAdminUserForm.value;
    this.adminUserManagementService.updateAdminUser(this.userId, data).subscribe(
      res => {
        this.flash.showSuccess(Messages.SUCCESS.adminUserUpdated);
        this.loaderService.stop();
        this.router.navigateByUrl('/admin/user-management');
      },
      err => {
        this.loaderService.stop();
      }
    );
  }

}
