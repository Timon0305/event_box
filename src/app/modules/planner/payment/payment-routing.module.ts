import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';
import { PaymentFinalComponent } from './payment-final/payment-final.component';
import { BreadCrumb } from '@app/config/breadcrumbs';


const routes: Routes = [
  {
    path: 'status',
    component: PaymentFinalComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER],
    }
  },
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER],
      breadcrumb: BreadCrumb.checkout
    },
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
