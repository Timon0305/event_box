import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerOrderListComponent } from './partner-order-list/partner-order-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [
  {
    path: ':orderId',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN, Constants.Role.PARTNER],
    },
    loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module')
      .then(m => m.QuoteViewModule)
  },
  {
    path: '',
    component: PartnerOrderListComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PARTNER, Constants.Role.ADMIN],
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerOrdersRoutingModule { }
