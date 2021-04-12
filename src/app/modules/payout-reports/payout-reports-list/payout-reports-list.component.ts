import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { changeQueryParams, trackByObjectId } from '@app/core/utils/common.util';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { PaymentHistoryService } from '@app/modules/payment-history/payment-history.service';
import { map } from 'rxjs/internal/operators/map';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-payout-reports-list',
  templateUrl: './payout-reports-list.component.html',
  styleUrls: ['./payout-reports-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayoutReportsListComponent implements OnInit, OnDestroy {
  payoutSortFilter = Constants.ADMIN_PAYOUT_REPORT;
  destroyed$ = new Subject();
  isFilter;
  payoutReportList$;
  payoutReportList;
  trackByFn = trackByObjectId;
  payoutTypes = Constants.PAYOUT_TYPES;
  isAdmin;
  constructor(
    private readonly paymentHistoryService: PaymentHistoryService,
    private readonly activatedRoute: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.isAdmin = this.paymentHistoryService.isAdmin();
    if (!this.isAdmin) {
      this.payoutSortFilter = Constants.VENDOR_PAYOUT_REPORT;
    }
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.isFilter = params.filter;
      this.getPayoutReportList(params);
    });
  }

  sortFilterChange(sort) {
    this.changeQueryParams(sort);
  }

  search(keyword) {
    this.changeQueryParams({ filter: keyword || null });

  }

  changeQueryParams(params) {
    changeQueryParams(params, this.activatedRoute, this.router);
  }

  pageChange(page) {
    this.changeQueryParams({ page });
  }

  getPayoutReportList(params) {
    this.payoutReportList$ = this.paymentHistoryService.getPayoutList(params)
      .pipe(map(res => this.payoutReportList = res));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
