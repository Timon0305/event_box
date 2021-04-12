import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubVendorListComponent } from './sub-vendor-list/sub-vendor-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [
  {
    path: '',
    component: SubVendorListComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubVendorManagementRoutingModule { }
