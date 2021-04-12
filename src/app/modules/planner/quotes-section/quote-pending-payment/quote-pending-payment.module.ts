import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotePendingPaymentRoutingModule } from './quote-pending-payment-routing.module';
import { QuotePendingPaymentListComponent } from './quote-pending-payment-list/quote-pending-payment-list.component';
import { QuotePendingPaymentTableComponent } from './quote-pending-payment-table/quote-pending-payment-table.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { ViewQuoteRequestModule } from '@app/shared/view-quote-request/view-quote-request.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';

@NgModule({
  declarations: [QuotePendingPaymentListComponent, QuotePendingPaymentTableComponent],
  imports: [
    CommonModule,
    QuotePendingPaymentRoutingModule,
    SharedSearchModule,
    NgSelectModule,
    NgbModule,
    SharedPhonePipeModule,
    SortByFilterModule,
    SharedConfirmationPopupModule,
    ViewQuoteRequestModule,
    PaginationModule,
    SharedDateRangeModule
  ]
})
export class QuotePendingPaymentModule { }
