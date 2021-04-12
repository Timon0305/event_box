import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewReportComponent } from './view-report/view-report.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';

const routes: Routes = [
  {
    path: 'products-services',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN],
    },
    loadChildren: () => import('@modules/vendor/products-services/view-all-products-services/view-all-products-services.module')
      .then(m => m.ViewAllProductsServicesModule)
  },
  {
    path: 'products-services/:id',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN],
    },
    loadChildren: () => import('@modules/vendor/products-services/view-product-service/view-product-service.module')
      .then(m => m.ViewProductServiceModule)
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
    path: 'quotes',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN],
    },
    loadChildren: () => import('@modules/planner/quotes-section/quotes-section.module')
      .then(m => m.QuotesSectionModule)
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
    path: 'orders',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN],
    },
    loadChildren: () => import('@modules/planner/orders/orders.module')
      .then(m => m.OrdersModule)
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
    path: '',
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN],
    },
    component: ViewReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
