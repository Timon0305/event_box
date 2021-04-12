import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesSectionRoutingModule } from './quotes-section-routing.module';
import { QuotesSectionComponent } from './quotes-section/quotes-section.component';
import { OrdersModule } from '../orders/orders.module';


@NgModule({
  declarations: [QuotesSectionComponent],
  imports: [
    CommonModule,
    QuotesSectionRoutingModule,
    OrdersModule
  ]
})
export class QuotesSectionModule { }
