import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptRejectQuotesRoutingModule } from './accept-reject-quotes-routing.module';
import { AcceptRejectQuotesListComponent } from './accept-reject-quotes-list/accept-reject-quotes-list.component';
import { AcceptRejectQuotesTableComponent } from './accept-reject-quotes-table/accept-reject-quotes-table.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { SharedCancelRejectPopupModule } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup.module';
import { ViewQuoteRequestModule } from '@app/shared/view-quote-request/view-quote-request.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';


@NgModule({
  declarations: [AcceptRejectQuotesListComponent, AcceptRejectQuotesTableComponent],
  imports: [
    CommonModule,
    AcceptRejectQuotesRoutingModule,
    SharedSearchModule,
    NgSelectModule,
    NgbModule,
    SharedPhonePipeModule,
    SortByFilterModule,
    SharedCancelRejectPopupModule,
    ViewQuoteRequestModule,
    PaginationModule,
    SharedDateRangeModule
  ]
})
export class AcceptRejectQuotesModule { }
