import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSearchModule } from '@shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@shared/sort-by-filter/sort-by-filter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedConfirmationPopupModule } from '@shared/shared-confirmation-popup/shared-confirmation-popup.module';

import { AdminUserManagementRoutingModule } from './admin-user-management-routing.module';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminUserSaveComponent } from './admin-user-save/admin-user-save.component';
import { NgxMaskModule } from 'ngx-mask';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { CountryCodeInputModule } from '@app/shared/country-code-input/country-code-input.module';

@NgModule({
  declarations: [AdminUsersListComponent, AdminUserSaveComponent],
  imports: [
    CommonModule,
    AdminUserManagementRoutingModule,
    SharedSearchModule,
    SortByFilterModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    SharedConfirmationPopupModule,
    NgxMaskModule.forRoot(),
    SharedPhonePipeModule,
    PaginationModule,
    CountryCodeInputModule
  ]
})
export class AdminUserManagementModule { }
