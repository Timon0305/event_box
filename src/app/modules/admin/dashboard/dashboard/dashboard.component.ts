import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Router } from '@angular/router';
import { SharedDateFilterComponent } from '@app/shared/shared-date-filter/shared-date-filter/shared-date-filter.component';
import { DashboardService } from '../dashboard.service';
import { map } from 'rxjs/internal/operators/map';
import { getFilterDateRange } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  filteredAnalytics$;
  allDashboardData$;
  totalAnalytics;
  dashboardData;
  filteredAnalytics;
  totlAnalytics$;
  @ViewChild(SharedDateFilterComponent, { static: false }) dateFilterComponent: SharedDateFilterComponent;
  @ViewChild(SharedDateRangeComponent, { static: true }) dateRangeComponent: SharedDateRangeComponent;
  constructor(
    private readonly sessionManager: SessionManagerService,
    private readonly router: Router,
    private readonly dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getFilteredReport({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) }, false);
    this.getOverAllData();
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
      this.getFilteredReport({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) }, true);
    } else {
      this.getFilteredReport({ dateFrom, dateTo }, true);
    }
  }

  getOverAllData() {
    this.totlAnalytics$ = this.dashboardService.getAnalytics().pipe(map(res => {      
        this.totalAnalytics = res;
    }));
  }

  getFilteredReport(params = {}, filter) {
    this.filteredAnalytics$ = this.dashboardService.getAnalytics(params).pipe(map(res => {
      if (!filter) {
        this.dashboardData = res;
      } else {
        this.dashboardData.orders = res.orders;
      }
    }));
  }

}
