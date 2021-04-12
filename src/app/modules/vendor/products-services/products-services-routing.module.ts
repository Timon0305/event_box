import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';

const routes: Routes = [{
  path: '',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR, Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/vendor/products-services/view-all-products-services/view-all-products-services.module')
    .then(m => m.ViewAllProductsServicesModule)
},
{
  path: 'add',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR],
  },
  loadChildren: () => import('@modules/vendor/products-services/add-product-service/add-product-service.module')
    .then(m => m.AddProductServiceModule)
},
{
  path: ':id',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR, Constants.Role.ADMIN],
  },
  loadChildren: () => import('@modules/vendor/products-services/view-product-service/view-product-service.module')
    .then(m => m.ViewProductServiceModule)
},
{
  path: 'edit/:id',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR],
  },
  loadChildren: () => import('@modules/vendor/products-services/add-product-service/add-product-service.module')
    .then(m => m.AddProductServiceModule)
},
{
  path: 'product-rating-review/:id',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR],
  },
  // tslint:disable-next-line: max-line-length
  loadChildren: () => import('@modules/vendor/products-services/view-all-product-rating-review-list/view-all-product-rating-review-list.module')
    .then(m => m.ViewAllProductRatingReviewListModule)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsServicesRoutingModule { }
