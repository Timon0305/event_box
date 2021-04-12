import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpiredCancelledListingComponent } from './expired-cancelled-listing/expired-cancelled-listing.component';
import { QuotesExpiredListingRoutingModule } from './expired-cancelled-routing.module';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpiredCancelledTableComponent } from './expired-cancelled-table/expired-cancelled-table.component';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';


@NgModule({
  declarations: [ExpiredCancelledListingComponent, ExpiredCancelledTableComponent],
  imports: [
    CommonModule,
    QuotesExpiredListingRoutingModule,
    SharedSearchModule,
    SortByFilterModule,
    NgbModule,
    PaginationModule,
    EventDatePipeModule
  ],
  exports: [ExpiredCancelledTableComponent, ExpiredCancelledListingComponent]
})
export class ExpiredCancelledListingModule { }
