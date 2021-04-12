import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentHistoryRoutingModule } from './payment-history-routing.module';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';
import { PaymentHistoryService } from './payment-history.service';
import { InfiniteScrollModule } from '@app/shared/infinite-scroll/infinite-scroll.module';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';


@NgModule({
  declarations: [PaymentHistoryComponent],
  imports: [
    CommonModule,
    PaymentHistoryRoutingModule,
    SharedSearchModule,
    SharedDateRangeModule,
    InfiniteScrollModule,
    SharedPhonePipeModule
  ],
   providers: [PaymentHistoryService]
})
export class PaymentHistoryModule { }
