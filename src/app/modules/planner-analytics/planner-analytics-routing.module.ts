import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlannerAnalyticsComponent } from './planner-analytics/planner-analytics.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: PlannerAnalyticsComponent
},
{
  path: 'quotes',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/planner/quotes-section/quotes-section.module')
    .then(m => m.QuotesSectionModule)
},
{
  path: 'events',
  loadChildren: () => import('@modules/planner/events/event-listing/event-listing.module')
    .then(m => m.EventListingModule)
},
{
  path: 'orders',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/planner/orders/orders.module')
    .then(m => m.OrdersModule)
},
{
  path: 'products-services-purchased',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/admin/report/products-services-purchased/products-services-purchased.module')
    .then(m => m.ProductsServicesPurchasedModule)
},
{
  path: 'quotes/:quoteViewId',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module')
    .then(m => m.QuoteViewModule)
},
{
  path: 'events/:eventViewId',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/planner/events/event-view/event-view.module')
    .then(m => m.EventViewModule)
},
{
  path: 'events/:eventViewId/quotes/:quoteViewId',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module')
    .then(m => m.QuoteViewModule)
},
{
  path: 'orders/:orderId',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module')
    .then(m => m.QuoteViewModule)
},
{
  path: 'products-services-purchased/:orderId',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module')
    .then(m => m.QuoteViewModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerAnalyticsRoutingModule { }
