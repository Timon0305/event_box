import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestQuoteComponent } from './request-quote/request-quote.component';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuoteProductPricingComponent } from './quote-product-pricing/quote-product-pricing.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';
import { SharedPhonePipeModule } from '../shared-phone-pipe/shared-phone-pipe.module';
import { TimezoneDateFormatModule } from '../pipes/timezone-date-format/timezone-date-format.module';

@NgModule({
  declarations: [RequestQuoteComponent, QuoteProductPricingComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    EventDatePipeModule,
    SharedPhonePipeModule,
    TimezoneDateFormatModule
  ], exports: [RequestQuoteComponent],
  entryComponents: [RequestQuoteComponent]
})
export class RequestQuoteModule { }
