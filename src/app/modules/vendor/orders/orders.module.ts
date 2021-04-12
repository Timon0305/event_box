import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListingComponent } from './order-listing/order-listing.component';
import { NewFulfilledDayoutTableComponent } from './new-fulfilled-dayout-table/new-fulfilled-dayout-table.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPlannerNamePipeModule } from '@app/shared/shared-planner-name-pipe/shared-planner-name-pipe.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';
import { TimezoneDateFormatModule } from '@app/shared/pipes/timezone-date-format/timezone-date-format.module';


@NgModule({
  declarations: [OrderListingComponent, NewFulfilledDayoutTableComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedSearchModule,
    SortByFilterModule,
    NgbModule,
    SharedPlannerNamePipeModule,
    PaginationModule,
    SharedPhonePipeModule,
    EventDatePipeModule,
    TimezoneDateFormatModule

  ], exports: [OrderListingComponent, NewFulfilledDayoutTableComponent]
})
export class OrdersModule { }
