import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesListingRoutingModule } from './quotes-listing-routing.module';
import { QuotesListingComponent } from './quotes-listing/quotes-listing.component';
import { PriceQuotesNeededComponent } from './price-quotes-needed/price-quotes-needed.component';
import { AwaitingQuotesAcceptanceComponent } from './awaiting-quotes-acceptance/awaiting-quotes-acceptance.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { SharedPlannerNamePipeModule } from '@app/shared/shared-planner-name-pipe/shared-planner-name-pipe.module';
import { RequestQuoteModule } from '@app/shared/request-quote/request-quote.module';
import { SharedCancelRejectPopupModule } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AdminViewQuoteModule } from '@app/modules/admin/vendor-management/admin-view-quote/admin-view-quote.module';
import { ViewQuoteRequestModule } from '@app/shared/view-quote-request/view-quote-request.module';




@NgModule({
  declarations: [QuotesListingComponent, PriceQuotesNeededComponent, AwaitingQuotesAcceptanceComponent],
  imports: [
    CommonModule,
    QuotesListingRoutingModule,
    NgbModule,
    SharedPhonePipeModule,
    SharedSearchModule,
    SortByFilterModule,
    SharedPlannerNamePipeModule,
    RequestQuoteModule,
    SharedCancelRejectPopupModule,
    PaginationModule,
    AdminViewQuoteModule,
    ViewQuoteRequestModule
  ],
  exports: [AwaitingQuotesAcceptanceComponent]
})
export class QuotesListingModule { }
