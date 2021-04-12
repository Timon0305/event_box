import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerOrdersRoutingModule } from './partner-orders-routing.module';
import { PartnerOrderListComponent } from './partner-order-list/partner-order-list.component';
import { PartnerOrderTableComponent } from './partner-order-table/partner-order-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PartnerListService } from '@app/modules/admin/partner-list/partner-list.service';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';

@NgModule({
  declarations: [PartnerOrderListComponent, PartnerOrderTableComponent],
  imports: [
    CommonModule,
    PartnerOrdersRoutingModule,
    NgSelectModule,
    SharedSearchModule,
    SortByFilterModule,
    PaginationModule,
    EventDatePipeModule
  ], providers: [PartnerListService]
})
export class PartnerOrdersModule { }
