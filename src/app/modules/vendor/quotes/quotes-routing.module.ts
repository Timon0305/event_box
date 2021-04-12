import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [
  {
    path: 'list',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR],
    },
    loadChildren: () => import('@modules/vendor/quotes/quotes-listing/quotes-listing.module')
      .then(m => m.QuotesListingModule)
  },
  {
    path: 'quote-detail/:quoteViewId',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR],
    },
    loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module')
      .then(m => m.QuoteViewModule)
  }, {
    path: 'expired-cancelled-list',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR],
    },
    loadChildren: () => import('@modules/vendor/quotes/expired-cancelled-listing/expired-cancelled-listing.module')
      .then(m => m.ExpiredCancelledListingModule)
  },
  {
    path: 'order-detail/:orderId',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR],
    },
    loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module')
      .then(m => m.QuoteViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule { }
