import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewQuoteRequestComponent } from './view-quote-request/view-quote-request.component';
import { NgxMaskModule } from 'ngx-mask';
import { SharedPlannerNamePipeModule } from '../shared-planner-name-pipe/shared-planner-name-pipe.module';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';
import { SharedPhonePipeModule } from '../shared-phone-pipe/shared-phone-pipe.module';
import { TimezoneDateFormatModule } from '../pipes/timezone-date-format/timezone-date-format.module';



@NgModule({
  declarations: [ViewQuoteRequestComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    SharedPlannerNamePipeModule,
    EventDatePipeModule,
    SharedPhonePipeModule,
    TimezoneDateFormatModule
  ], entryComponents: [ViewQuoteRequestComponent],
  exports: [ViewQuoteRequestComponent]
})
export class ViewQuoteRequestModule { }
