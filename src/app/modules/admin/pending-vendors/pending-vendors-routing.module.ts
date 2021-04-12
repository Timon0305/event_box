import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingVendorListComponent } from './pending-vendor-list/pending-vendor-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: PendingVendorListComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingVendorsRoutingModule { }
