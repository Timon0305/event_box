import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewVariableInfoComponent } from './view-variable-info/view-variable-info.component';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';
import { TimezoneDateFormatModule } from '@app/shared/pipes/timezone-date-format/timezone-date-format.module';



@NgModule({
  declarations: [ViewVariableInfoComponent],
  imports: [
    CommonModule,
    EventDatePipeModule,
    TimezoneDateFormatModule
  ], exports: [ViewVariableInfoComponent]
})
export class ViewVariableInfoModule { }
