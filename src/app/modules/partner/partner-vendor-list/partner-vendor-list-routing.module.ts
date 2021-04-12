import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerVendorListComponent } from './partner-vendor-list/partner-vendor-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: PartnerVendorListComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.PARTNER, Constants.Role.ADMIN],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerVendorListRoutingModule { }
