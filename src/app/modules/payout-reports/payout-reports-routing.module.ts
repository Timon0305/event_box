import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayoutReportsListComponent } from './payout-reports-list/payout-reports-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: PayoutReportsListComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR, Constants.Role.ADMIN],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayoutReportsRoutingModule { }
