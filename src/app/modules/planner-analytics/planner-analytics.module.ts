import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlannerAnalyticsRoutingModule } from './planner-analytics-routing.module';
import { PlannerAnalyticsComponent } from './planner-analytics/planner-analytics.component';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { SharedDateFilterModule } from '@app/shared/shared-date-filter/shared-date-filter.module';


@NgModule({
  declarations: [PlannerAnalyticsComponent],
  imports: [
    CommonModule,
    PlannerAnalyticsRoutingModule,
    SharedPhonePipeModule,
    SharedDateFilterModule
  ]
})
export class PlannerAnalyticsModule { }
