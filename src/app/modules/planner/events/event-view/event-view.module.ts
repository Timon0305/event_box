import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventViewRoutingModule } from './event-view-routing.module';
import { EventViewComponent } from './event-view/event-view.component';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';
import { TimezoneDateFormatModule } from '@app/shared/pipes/timezone-date-format/timezone-date-format.module';

@NgModule({
  declarations: [EventViewComponent],
  imports: [
    CommonModule,
    EventViewRoutingModule,
    SharedPhonePipeModule,
    BreadcrumbsModule,
    EventDatePipeModule,
    TimezoneDateFormatModule
  ]
})
export class EventViewModule { }
