import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '@app/config/constant';
import { ViewReportService } from './view-report.service';
import { map } from 'rxjs/internal/operators/map';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { SharedDateFilterComponent } from '@app/shared/shared-date-filter/shared-date-filter/shared-date-filter.component';
import { getFilterDateRange } from '@app/core/utils/common.util';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss'],
  providers: [ViewReportService]
})
export class ViewReportComponent implements OnInit {
  adminRoutes = Constants.APPLICATION_ROUTES.admin;
  type = { product: Constants.PRODUCT_TYPE, service: Constants.SERVICE_TYPE };
  pastEventType = Constants.EVENT_TYPE.pastEvent;
  reportData$;
  filteredReportsData$;
  filteredReportsData;
  @ViewChild(SharedDateRangeComponent, { static: false }) dateRangeComponent: SharedDateRangeComponent;
  @ViewChild(SharedDateFilterComponent, { static: false }) dateFilterComponent: SharedDateFilterComponent;
  constructor(private readonly report: ViewReportService) { }
  ngOnInit() {
    this.getReportsData();
    this.getFilteredReportData({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) });
  }

  quoteReportFilter(params) {
    this.getReportsData({ ...params, type: Constants.ADMIN_REPORT_FILTER_TYPE.quote });
  }

  orderReportFilter(params) {
    this.getReportsData({ ...params, type: Constants.ADMIN_REPORT_FILTER_TYPE.order });
  }

  clearDateFilter(params) {
    this.getReportsData({ ...params, type: null });
  }

  getReportsData(params = {}) {
    this.reportData$ = this.report.getReportsData(params);
  }

  getFilteredReportData(params = {}) {
    this.filteredReportsData$ = this.report.getReportsData(params).pipe(map(res => {
      this.filteredReportsData = res;
    }));
  }

  quoteDateFilter(event) {
    if (event.dateType) {
      this.dateRangeComponent.clearDateWithoutEmit();
    } else if (this.dateFilterComponent) {
      this.dateFilterComponent.selectedValue.setValue(null);
    }
    const { dateFrom = null, dateTo = null } = event;
    if (!dateFrom && !dateTo) {
      this.dateFilterComponent.selectedValue.setValue(Constants.API_DATE_FILTER_TYPE.month);
      this.getFilteredReportData({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) });
    } else {
      this.getFilteredReportData({ dateFrom, dateTo });
    }
  }

}
