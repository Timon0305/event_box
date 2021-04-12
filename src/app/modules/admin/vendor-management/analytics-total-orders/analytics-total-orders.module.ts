import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsTotalOrdersRoutingModule } from './analytics-total-orders-routing.module';
import { AnalyticsTotalOrdersComponent } from './analytics-total-orders/analytics-total-orders.component';
import { OrdersModule } from '@app/modules/vendor/orders/orders.module';


@NgModule({
  declarations: [AnalyticsTotalOrdersComponent],
  imports: [
    CommonModule,
    AnalyticsTotalOrdersRoutingModule,
    OrdersModule
  ]
})
export class AnalyticsTotalOrdersModule { }
