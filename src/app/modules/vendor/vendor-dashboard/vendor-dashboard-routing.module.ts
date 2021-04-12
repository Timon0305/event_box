import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { Constants } from '@app/config/constant';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';


const routes: Routes = [
  {
    path: '',
    component: VendorDashboardComponent,
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
export class VendorDashboardRoutingModule { }
