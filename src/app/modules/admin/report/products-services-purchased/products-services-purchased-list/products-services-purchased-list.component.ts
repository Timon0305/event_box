
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Constants } from '@app/config/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { changeQueryParams } from '@app/core/utils/common.util';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/internal/operators/map';
import { OrdersService } from '@app/modules/planner/orders/orders.service';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { PlannerManagementService } from '@app/modules/admin/planner-management/services/planner-management.service';

@Component({
  selector: 'app-products-services-purchased-list',
  templateUrl: './products-services-purchased-list.component.html',
  styleUrls: ['./products-services-purchased-list.component.scss'],
  providers: [OrdersService]
})
export class ProductsServicesPurchasedListComponent implements OnInit, OnDestroy {
  maxPaginationSize = Constants.PAGINATION_MAX_SIZE;
  purchasedOrder$;
  paramsLength = 0;
  destroyed$ = new Subject();
  sortingData = Constants.PURCHASED_ORDERS_LIST_FILTER;
  totalDocs;
  plannerId;
  breadcrumb = BreadCrumb.adminProductServicePurchased;
  plannerName = '';
  @ViewChild(SharedDateRangeComponent, { static: false }) dateRangeComponent: SharedDateRangeComponent;
  constructor(
    private readonly router: Router, private readonly plannerMgmtService: PlannerManagementService,
    private readonly ordersService: OrdersService, private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.plannerId = this.route.snapshot.parent ? this.route.snapshot.parent.params.plannerId : null;
    if (this.plannerId) {
      this.plannerMgmtService.getPlannerName(this.plannerId)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => this.plannerName = res.plannerName);
    }
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.paramsLength = Object.keys(params).length;
      this.getOrdersData(params);
    });
  }

  getOrdersData(queryParams) {
    this.purchasedOrder$ =
      this.ordersService.getOrderList
        ({ ...queryParams, status: Constants.PAYMENT_STATUS.PURCHASED }, true,
          this.plannerId)
        .pipe(map(res => {
          this.totalDocs = res.data.totalDocs || 0;
          return res;
        }));
  }
  search(filter) {
    filter = filter ? filter : null;
    this.changeQueryParams({ filter, page: 1 });
  }

  pageChange(page) {
    this.changeQueryParams({ page });
  }
  changeQueryParams(params) {
    changeQueryParams(params, this.route, this.router);
  }
  sort(filter) {
    this.changeQueryParams(filter);
  }

  fetchReport() {
    const roleBasedPayload = this.ordersService.getRoleBasedPayload(true,
      this.plannerId);
    this.ordersService.fetchReport(
      Constants.EXPORTS_DATA.orders.purchased, this.dateRangeComponent, roleBasedPayload)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

