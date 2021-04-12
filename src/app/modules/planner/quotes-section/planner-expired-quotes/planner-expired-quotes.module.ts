import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlannerExpiredQuotesRoutingModule } from './planner-expired-quotes-routing.module';
import { PlannerExpiredQuotesListComponent } from './planner-expired-quotes-list/planner-expired-quotes-list.component';
import { PlannerExpiredQuotesTableComponent } from './planner-expired-quotes-table/planner-expired-quotes-table.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { ViewQuoteRequestModule } from '@app/shared/view-quote-request/view-quote-request.module';
import { RadioButtonModule } from '@app/shared/radio-button/radio-button.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';
import { ViewNotesModule } from '../../quote-request-folder/view-notes/view-notes.module';

@NgModule({
  declarations: [PlannerExpiredQuotesListComponent, PlannerExpiredQuotesTableComponent],
  imports: [
    CommonModule,
    PlannerExpiredQuotesRoutingModule,
    SharedSearchModule,
    NgSelectModule,
    NgbModule,
    SharedPhonePipeModule,
    SortByFilterModule,
    ViewQuoteRequestModule,
    RadioButtonModule,
    PaginationModule,
    SharedDateRangeModule,
    ViewNotesModule
  ]
})
export class PlannerExpiredQuotesModule { }
