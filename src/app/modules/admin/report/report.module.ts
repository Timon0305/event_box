import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ViewReportComponent } from './view-report/view-report.component';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';
import { SharedDateFilterModule } from '@app/shared/shared-date-filter/shared-date-filter.module';


@NgModule({
  declarations: [ViewReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedDateRangeModule,
    SharedDateFilterModule
  ]
})
export class ReportModule { }
