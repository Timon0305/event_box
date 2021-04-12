import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SharedDateFilterComponent } from '@app/shared/shared-date-filter/shared-date-filter/shared-date-filter.component';
import { DashboardService } from '../dashboard.service';
import { map } from 'rxjs/internal/operators/map';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { getFilterDateRange } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [DashboardService]
})
export class MembersComponent implements OnInit {
  @Input() members;
  @ViewChild(SharedDateRangeComponent, { static: true }) dateRangeComponent: SharedDateRangeComponent;
  @ViewChild(SharedDateFilterComponent, { static: false }) dateFilterComponent: SharedDateFilterComponent;
  filteredMembersAnalitics$;

  constructor(private readonly dashboardService: DashboardService) { }

  ngOnInit() {
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
      this.getFilteredMembersDate({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) });
    } else {
      this.getFilteredMembersDate({ dateFrom, dateTo });
    }
  }

  getFilteredMembersDate(params = {}) {
    this.filteredMembersAnalitics$ = this.dashboardService.getAnalytics(params).pipe(map(res => {
      this.members = res.members;
    }));

  }

}
