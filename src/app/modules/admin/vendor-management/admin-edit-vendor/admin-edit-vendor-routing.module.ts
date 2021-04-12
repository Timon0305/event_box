import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminEditVendorComponent } from './admin-edit-vendor/admin-edit-vendor.component';
import { Constants } from '@app/config/constant';
import { BreadCrumb } from '@app/config/breadcrumbs';


const routes: Routes = [{
  path: '',
  component: AdminEditVendorComponent,
  data: {
    expectedRole: [Constants.Role.ADMIN],
    breadcrumb: BreadCrumb.adminEditVendor
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEditVendorRoutingModule { }
