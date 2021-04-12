import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsServicesListComponent } from './products-services-list/products-services-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: ProductsServicesListComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR, Constants.Role.ADMIN],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllProductsServicesRoutingModule { }
