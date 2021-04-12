import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotePendingPaymentListComponent } from './quote-pending-payment-list/quote-pending-payment-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [
  {
    path: 'list',
    component: QuotePendingPaymentListComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN],
    },
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotePendingPaymentRoutingModule { }
