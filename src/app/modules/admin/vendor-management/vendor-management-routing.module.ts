import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { Constants } from '@app/config/constant';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';


const routes: Routes = [
  {
    path: '',
    component: VendorListComponent
  },
  {
    path: 'accept-vendor/:id',
    loadChildren: () => import('@modules/admin/vendor-management/accept-vendor/accept-vendor.module')
      .then(m => m.AcceptVendorModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('@modules/admin/vendor-management/admin-edit-vendor/admin-edit-vendor.module')
      .then(m => m.AdminEditVendorModule)
  },
  {
    path: 'edit/membership/:id',
    loadChildren: () => import('@modules/admin/vendor-management/accept-vendor/accept-vendor.module')
      .then(m => m.AcceptVendorModule),
    data: {
      editMembership: true
    }
  },
  {
    path: 'view/:id',
    component: ViewVendorComponent
  },
  {
    path: 'my-product-rating-review/:companyId',
    loadChildren: () => import('@modules/vendor/profile/myall-product-rating-review-list/myall-product-rating-review-list.module').
      then(m => m.MyallProductRatingReviewListModule),
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN]
    }
  },
  {
    path: ':id/all-quotes/:companyId',
    loadChildren: () => import('@modules/admin/vendor-management/analytics-total-quotes/analytics-total-quotes.module').
      then(m => m.AnalyticsTotalQuotesModule),
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN]
    },
  },
  {
    path: ':id/quote-view/:companyId/:quoteViewId',
    loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module').
      then(m => m.QuoteViewModule),
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN]
    }
  },
  {
    path: ':id/all-orders/:companyId',
    loadChildren: () => import('@modules/admin/vendor-management/analytics-total-orders/analytics-total-orders.module').
      then(m => m.AnalyticsTotalOrdersModule),
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN]
    },
  },
  {
    path: ':id/order-view/:companyId/:orderId',
    loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module').
      then(m => m.QuoteViewModule),
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN]
    },
  },
  {
    path: ':id/:companyId/products-services',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN],
    },
    loadChildren: () => import('@modules/vendor/products-services/view-all-products-services/view-all-products-services.module')
      .then(m => m.ViewAllProductsServicesModule)
  },
  {
    path: ':vendorId/:companyId/products-services/:id',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.ADMIN],
    },
    loadChildren: () => import('@modules/vendor/products-services/view-product-service/view-product-service.module')
      .then(m => m.ViewProductServiceModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorManagementRoutingModule { }
