import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '@app/core/services/common/common.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit, OnDestroy {
  headerCount;
  dashboardCount;
  sortingParams = Constants.DEFAULT_SORTING_PARAMS;
  private readonly destroyed$ = new Subject();
  constructor(private readonly commonService: CommonService) { }

  ngOnInit() {
    this.subscribeHeaderCount();
    this.getDashboardCounts();
  }

  subscribeHeaderCount() {
    this.commonService.getHeaderCount().pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.headerCount = res;
      });
  }
  getDashboardCounts() {
    this.commonService.getDashboardCounts().pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.dashboardCount = res.data;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
