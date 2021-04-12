import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptVendorComponent } from './accept-vendor/accept-vendor.component';
import { Constants } from '@app/config/constant';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';


const routes: Routes = [{
  path: '',
  component: AcceptVendorComponent,
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
  canActivate: [RouteGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptVendorRoutingModule { }
