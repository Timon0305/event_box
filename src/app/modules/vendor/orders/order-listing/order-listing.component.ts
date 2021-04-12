import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Constants } from '@app/config/constant';
import { OrderService } from '../services/order.service';
import { CheckRoles } from '@app/core/utils/common.util';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  providers: [OrderService]
})
export class OrderListingComponent implements OnInit, OnDestroy {
  paramsLength;
  selectedTab;
  orderList$;
  sortingData;
  dayOutPayload;
  isAdmin: boolean;
  sortingKeys;
  readonly destroyed$ = new Subject();
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly orderService: OrderService,
    private readonly checkRole: CheckRoles
  ) { }

  ngOnInit() {
    this.checkCurrentRoute();
    this.isAdmin = this.checkRole.isAdmin();
  }

  checkCurrentRoute() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {      
      if (params.type === Constants.ORDER_TYPES.NEW_ORDERS) {
        this.selectedTab = Constants.ORDER_TYPES.NEW_ORDERS;
        this.sortingData = Constants.NEW_DAYOUT_ORDER_FILTER;
        this.dayOutPayload = {
          from: new Date().toISOString(),
          dateType: Constants.FILTER_IN_ORDER_DATATYPE.ORDER_BY_EVENT
        };
      } else if (params.type === Constants.ORDER_TYPES.FULFILLED_ORDERS) {
        this.selectedTab = Constants.ORDER_TYPES.FULFILLED_ORDERS;
        this.sortingData = Constants.FULFILLED_ORDER_FILTER;
      } else if (params.status === Constants.EXPORTS_DATA.orders.canceled) {
        this.selectedTab = params.status;
        this.sortingData = Constants.VENDOR_CANCELLED_ORDER_FILTER;
      } else {
        this.selectedTab = Constants.ORDER_TYPES.DAY_OUR_ORDERS;
        this.sortingData = Constants.NEW_DAYOUT_ORDER_FILTER;
        this.dayOutPayload = {
          from: new Date().toISOString(),
          to: new Date(new Date().setDate(new Date().getDate() + Constants.NUMBER.thirty)).toISOString(),
          dateType: Constants.FILTER_IN_ORDER_DATATYPE.ORDER_BY_EVENT
        };
      }
      const type = this.selectedTab;
      if (this.checkRole.isAdmin()) {
        this.sortingData = Constants.ADMIN_ORDER_LIST;
        this.getAdminOrdersList({ ...params, type, ...this.dayOutPayload });
      } else {
        this.getOrdersList({ ...params, type, ...this.dayOutPayload });
      }

      this.paramsLength = Object.keys(params).length;
    });
  }

  getOrdersList(options = {}) {    
    this.orderList$ = this.orderService.getQuotesList(options);
  }

  getAdminOrdersList(options = {}) {
    this.orderList$ = this.orderService.getAdminQuotesList(options);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
