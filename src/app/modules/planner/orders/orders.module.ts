import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersTabComponent } from './orders-tab/orders-tab.component';
import { PurchasedOrdersComponent } from './purchased-orders/purchased-orders.component';
import { CanceledOrdersComponent } from './canceled-orders/canceled-orders.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from './orders.service';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { ViewQuoteRequestModule } from '@app/shared/view-quote-request/view-quote-request.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';

@NgModule({
  declarations: [
    OrdersTabComponent, PurchasedOrdersComponent, CanceledOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedSearchModule,
    SortByFilterModule,
    NgbModule,
    SharedPhonePipeModule,
    SharedConfirmationPopupModule,
    NoImageDirectiveModule,
    ViewQuoteRequestModule,
    BreadcrumbsModule,
    PaginationModule,
    SharedDateRangeModule
  ],
  providers: [OrdersService],
  exports: [PurchasedOrdersComponent]
})
export class OrdersModule { }
