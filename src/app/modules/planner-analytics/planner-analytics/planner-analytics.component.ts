import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlannerManagementService } from '../../admin/planner-management/services/planner-management.service';
import { Observable } from 'rxjs';
import { IPaginatedData } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { getFilterDateRange } from '@app/core/utils/common.util';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-planner-analytics',
  templateUrl: './planner-analytics.component.html',
  styleUrls: ['./planner-analytics.component.scss']
})
export class PlannerAnalyticsComponent implements OnInit {
  pastEventType = Constants.EVENT_TYPE.pastEvent;
  plannerId;
  public plannerObservable: Observable<IPaginatedData>;
  analytics$;
  analyticsData;
  blankData = Constants.BLANK_HYPHEN;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly plannerManagementService: PlannerManagementService
  ) { }

  ngOnInit() {
    this.plannerId = this.activatedRoute.snapshot.paramMap.get('plannerId');
    this.plannerObservable = this.plannerManagementService.getPlannerById(this.plannerId);
    this.getAnalytics({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) });
  }

  dateFilter(date) {
    delete date.dateType;
    this.getAnalytics(date);
  }
  getAnalytics(params = {}) {
    this.analytics$ = this.plannerManagementService.getAnalyticsData(this.plannerId, params)
      .pipe(map(res => {
        this.analyticsData = res;
      }));
  }

}
