import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminUserSaveComponent } from './admin-user-save/admin-user-save.component';
import { BreadCrumb } from '@app/config/breadcrumbs';


const routes: Routes = [
  {
    path: '', component: AdminUsersListComponent
  },
  {
    path: 'save', component: AdminUserSaveComponent,
    data: {
      breadcrumb: BreadCrumb.adminSubUserAdd
    }
  },
  {
    path: 'save/:id', component: AdminUserSaveComponent,
    data: {
      breadcrumb: BreadCrumb.adminSubUserEdit
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserManagementRoutingModule { }
