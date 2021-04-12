import { Component, OnInit } from '@angular/core';
import { AdminUserManagementService } from '../services/admin-user-management.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { Observable } from 'rxjs';
import { IPaginatedData } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { SharedConfirmationPopupService } from '@shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { IModalMetaData } from '@app/models/popUpMeta';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss'],
  providers: [AdminUserManagementService]
})
export class AdminUsersListComponent implements OnInit {
  params: Params;
  public userObservable: Observable<IPaginatedData>;
  sortingData = Constants.ADMIN_PENDING_USER_SORTING;
  blankData = Constants.BLANK_HYPHEN;
  loggedInUserId;
  constructor(
    private readonly adminUserManagementService: AdminUserManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly router: Router,
    private readonly sharedConfirmationPopupService: SharedConfirmationPopupService,
    private readonly flash: AlertService,
    private readonly sessionManagerService: SessionManagerService
  ) { }

  ngOnInit() {
    this.loaderService.start();
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      this.userObservable = this.adminUserManagementService.getUserList(params);
    });
    this.loggedInUserId = this.sessionManagerService.getUserId();
  }

  pageChange(pageNumber) {
    this.params = Object.assign({}, this.params);
    this.params.page = pageNumber;
    this.adminUserManagementService.redirect(this.params);
  }

  searchVendors(keyword) {
    this.params = Object.assign({});
    this.params.filter = keyword;
    this.adminUserManagementService.redirect(this.params);
  }

  sort($event) {
    this.params = Object.assign({}, this.params);
    this.params = { ...this.params, ...$event };
    this.adminUserManagementService.redirect(this.params);
  }

  edit(id: string) {
    this.router.navigateByUrl(`/admin/user-management/save/${id}`);
    return;
  }

  askAdminUserStatus(id: string, status) {
    this.sharedConfirmationPopupService.showPopup({
      title: `${status ? 'Inactivate' : 'Activate'} User`,
      text: `Do you want to ${status ? 'Inactivate' : 'Activate'} this user?`,
      leftButton: 'Cancel',
      rightButton: 'Yes'
    } as IModalMetaData).result.then(res => {
      if (res) {
        this.updateAdminUserStatus(id, status ? 0 : 1);
      }
    });
  }

  updateAdminUserStatus(id: string, status) {
    this.loaderService.start();
    this.adminUserManagementService.changeAdminUserStatus(id, status).subscribe(
      res => {
        this.loaderService.stop();
        this.flash.showSuccess(Messages.SUCCESS.adminUserStatus);
        this.userObservable = this.adminUserManagementService.getUserList(this.params);
      },
      err => {
        this.loaderService.stop();
      }
    );
  }

  askDelete(id: string) {
    this.sharedConfirmationPopupService.showPopup({
      title: `Delete User`,
      text: `Do you want to delete this user?`,
      leftButton: 'Cancel',
      rightButton: 'Yes'
    } as IModalMetaData).result.then(res => {
      if (res) {
        this.delete(id);
      }
    });
  }

  delete(id: string) {
    this.loaderService.start();
    this.adminUserManagementService.deleteAdminUser(id).subscribe(
      res => {
        this.flash.showSuccess(Messages.SUCCESS.adminUserDelete);
        this.loaderService.stop();
        this.userObservable = this.adminUserManagementService.getUserList(this.params);
      },
      res => {
        this.loaderService.stop();
      }
    );
  }
}
