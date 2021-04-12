import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ACHReportRoutingModule } from './ach-report-routing.module';
import { ReportListingComponent } from './report-listing/report-listing.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccountReportComponent } from './account-report/account-report.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AchReportService } from './ach-report.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FormatDatePipeModule } from '@app/shared/pipes/format-date-pipe/format-date-pipe.module';
import { InfiniteScrollModule } from '@app/shared/infinite-scroll/infinite-scroll.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';
import { TimezoneDateFormatModule } from '@app/shared/pipes/timezone-date-format/timezone-date-format.module';

@NgModule({
  declarations: [ReportListingComponent, AccountReportComponent, ReportDetailComponent],
  imports: [
    CommonModule,
    ACHReportRoutingModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    FormatDatePipeModule,
    InfiniteScrollModule,
    NoImageDirectiveModule,
    EventDatePipeModule,
    TimezoneDateFormatModule,
  ],
  providers: [AchReportService],
  entryComponents: [AccountReportComponent]
})
export class ACHReportModule { }
