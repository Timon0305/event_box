import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersTabComponent } from './orders-tab/orders-tab.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';
import { PurchasedOrdersComponent } from './purchased-orders/purchased-orders.component';
import { CanceledOrdersComponent } from './canceled-orders/canceled-orders.component';


const routes: Routes = [
  {
    path: '',
    component: OrdersTabComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN],
    },
    children: [
      {
        path: 'purchased',
        component: PurchasedOrdersComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN],
        },
      }, {
        path: 'canceled',
        component: CanceledOrdersComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN],
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
