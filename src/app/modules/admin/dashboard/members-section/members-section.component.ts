import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SharedDateFilterComponent } from '@app/shared/shared-date-filter/shared-date-filter/shared-date-filter.component';
import { map } from 'rxjs/internal/operators/map';
import { DashboardService } from '../dashboard.service';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { Constants } from '@app/config/constant';
import { getFilterDateRange } from '@app/core/utils/common.util';

@Component({
  selector: 'app-members-section',
  templateUrl: './members-section.component.html',
  styleUrls: ['./members-section.component.scss'],
  providers: [DashboardService]
})
export class MembersSectionComponent implements OnInit {
  @Input() memberSection;
  filteredMemberSectionAnalitics$;
  @ViewChild(SharedDateRangeComponent, { static: true }) dateRangeComponent: SharedDateRangeComponent;

  @ViewChild(SharedDateFilterComponent, { static: false }) dateFilterComponent: SharedDateFilterComponent;

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
      this.getFilteredMemberSection({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) });
    } else {
      this.getFilteredMemberSection({ dateFrom, dateTo });
    }
  }

  getFilteredMemberSection(params = {}) {
    this.filteredMemberSectionAnalitics$ = this.dashboardService.getAnalytics(params).pipe(map(res => {
      this.memberSection = res.quotes;
    }));

  }

}
