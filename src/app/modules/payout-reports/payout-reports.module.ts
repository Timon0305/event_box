import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayoutReportsRoutingModule } from './payout-reports-routing.module';
import { PayoutReportsListComponent } from './payout-reports-list/payout-reports-list.component';

import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { PaymentHistoryService } from '../payment-history/payment-history.service';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';


@NgModule({
  declarations: [PayoutReportsListComponent],
  imports: [
    CommonModule,
    PayoutReportsRoutingModule,
    SharedSearchModule,
    NoImageDirectiveModule,
    PaginationModule,
    SortByFilterModule,
    EventDatePipeModule
  ],
  providers: [PaymentHistoryService]
})
export class PayoutReportsModule { }
