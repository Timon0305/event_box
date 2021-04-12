import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivatedRoute, Router } from '@angular/router';
import { AchReportService } from '../ach-report.service';
import { map } from 'rxjs/internal/operators/map';
import { changeQueryParams, trackByObjectId } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  ordersList$;
  ordersList;
  trackByFn = trackByObjectId;
  timeZoneMap = Constants.TIME_ZONE_DISPLAY_MAP;
  params;
  loading;
  isAdmin;
  constructor(
    private readonly sessionService: SessionManagerService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute, private readonly achReportService: AchReportService) { }

  ngOnInit() {
    this.isAdmin = this.sessionService.getRole() === Constants.Role.ADMIN;
    this.params = this.activatedRoute.snapshot.queryParams;
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.getOrdersList({...params});
    });

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getOrdersList(params) {
    delete params.date;
    delete params.companyName;
    delete params.payoutAmount;
    const { date, payoutTo } = this.activatedRoute.snapshot.params;
    this.loading = true;
    this.ordersList$ = this.achReportService.getOrdersList({ date, payoutTo }, params)
      .pipe(map(res => {
        this.ordersList = res;
        this.loading = false;
      }));
  }

  pageChange(page) {
    this.changeQueryParams({ page });
  }

  changeQueryParams(params) {
    changeQueryParams(params, this.activatedRoute, this.router);
  }

  viewOrderDetail(orderId) {
    this.router.navigate(['./orders', orderId], {relativeTo: this.activatedRoute});
  }
}
