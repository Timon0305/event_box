import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsTotalQuotesRoutingModule } from './analytics-total-quotes-routing.module';
import { AnalyticsTotalQuotesComponent } from './analytics-total-quotes/analytics-total-quotes.component';
import { QuotesListingModule } from '@app/modules/vendor/quotes/quotes-listing/quotes-listing.module';
import { ExpiredCancelledListingModule } from '@app/modules/vendor/quotes/expired-cancelled-listing/expired-cancelled-listing.module';
import { QuotesService } from '@app/modules/vendor/quotes/services/quotes.service';


@NgModule({
  declarations: [AnalyticsTotalQuotesComponent],
  imports: [
    CommonModule,
    AnalyticsTotalQuotesRoutingModule,
    QuotesListingModule,
    ExpiredCancelledListingModule
  ],
  providers: [QuotesService]
})
export class AnalyticsTotalQuotesModule { }
