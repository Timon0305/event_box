import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotesSectionComponent } from './quotes-section/quotes-section.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';
import { PurchasedOrdersComponent } from '../orders/purchased-orders/purchased-orders.component';


const routes: Routes = [
  {
    path: '',
    component: QuotesSectionComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN],
    },
    children: [
      {
        path: 'awaiting-vendor-quotes',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/planner/quotes-section/awaiting-vendor-quotes/awaiting-vendor-quotes.module')
          .then(m => m.AwaitingVendorQuotesModule)
      }, {
        path: 'accept-reject-quotes',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/planner/quotes-section/accept-reject-quotes/accept-reject-quotes.module')
          .then(m => m.AcceptRejectQuotesModule)
      }, {
        path: 'expired-quotes',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/planner/quotes-section/planner-expired-quotes/planner-expired-quotes.module')
          .then(m => m.PlannerExpiredQuotesModule)
      }, {
        path: 'quote-pending-payment',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/planner/quotes-section/quote-pending-payment/quote-pending-payment.module')
          .then(m => m.QuotePendingPaymentModule)
      },
      {
        path: 'products-purchased',
        canActivate: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN]
        },
        component: PurchasedOrdersComponent
      },
      {
        path: 'rejected-quotes',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/planner/quotes-section/planner-expired-quotes/planner-expired-quotes.module')
          .then(m => m.PlannerExpiredQuotesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesSectionRoutingModule { }
