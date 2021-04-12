import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListingComponent } from './order-listing/order-listing.component';


const routes: Routes = [
  {
    path: '',
    component: OrderListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
