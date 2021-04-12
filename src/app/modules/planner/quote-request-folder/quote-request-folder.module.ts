import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRequestFolderRoutingModule } from './quote-request-folder-routing.module';
import { QuoteRequestListComponent } from './quote-request-list/quote-request-list.component';
import { QuoteRequestTableComponent } from './quote-request-table/quote-request-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { ViewQuoteVariableComponent } from './view-quote-variable/view-quote-variable.component';
import { VariableInfoPopupModule } from '@app/shared/variable-info-popup/variable-info-popup.module';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { ViewVariableInfoModule } from '@app/shared/view-variable-info/view-variable-info.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { ViewNotesModule } from './view-notes/view-notes.module';
import { FormatDatePipeModule } from '@shared/pipes/format-date-pipe/format-date-pipe.module';
@NgModule({
  declarations: [QuoteRequestListComponent, QuoteRequestTableComponent,
    ViewQuoteVariableComponent],
  imports: [
    CommonModule,
    QuoteRequestFolderRoutingModule,
    NgbModule,
    NgSelectModule,
    SharedSearchModule,
    VariableInfoPopupModule,
    SharedConfirmationPopupModule,
    ViewVariableInfoModule,
    ReactiveFormsModule,
    SortByFilterModule,
    FormsModule,
    PaginationModule,
    ViewNotesModule,
    FormatDatePipeModule
  ], entryComponents: [ViewQuoteVariableComponent]
})
export class QuoteRequestFolderModule { }
