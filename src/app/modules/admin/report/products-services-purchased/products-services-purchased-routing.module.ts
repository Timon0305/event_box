import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsServicesPurchasedListComponent } from './products-services-purchased-list/products-services-purchased-list.component';
import { BreadCrumb } from '@app/config/breadcrumbs';


const routes: Routes = [{
  path: '',
  component: ProductsServicesPurchasedListComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsServicesPurchasedRoutingModule { }
