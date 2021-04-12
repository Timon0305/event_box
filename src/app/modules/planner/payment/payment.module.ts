import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentFinalComponent } from './payment-final/payment-final.component';
import { AddCreditCardDetailsModule } from '../profile/add-credit-card-details/add-credit-card-details.module';
import { SharedCartTableModule } from '@app/shared/shared-cart-table/shared-cart-table.module';
import { SavedCardListComponent } from './saved-card-list/saved-card-list.component';
import { OrderPriceSummaryComponent } from './order-price-summary/order-price-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreventKeyModule } from '@app/shared/directives/prevent-key/prevent-key.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [CheckoutComponent, PaymentFinalComponent, SavedCardListComponent, OrderPriceSummaryComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    AddCreditCardDetailsModule,
    SharedCartTableModule,
    FormsModule,
    PreventKeyModule,
    ReactiveFormsModule,
    BreadcrumbsModule
  ]
})
export class PaymentModule { }
