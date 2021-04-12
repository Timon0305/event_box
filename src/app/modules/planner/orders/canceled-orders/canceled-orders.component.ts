import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '@app/config/constant';
import { Subject } from 'rxjs/internal/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { changeQueryParams, CheckRoles } from '@app/core/utils/common.util';
import { map } from 'rxjs/internal/operators/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewQuoteRequestComponent } from '@app/shared/view-quote-request/view-quote-request/view-quote-request.component';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';

@Component({
  selector: 'app-canceled-orders',
  templateUrl: './canceled-orders.component.html',
  styleUrls: ['./canceled-orders.component.scss'],
})
export class CanceledOrdersComponent implements OnInit {
  canceledOrders$;
  paramsLength = 0;
  destroyed$ = new Subject();
  sortingData = Constants.CANCELED_ORDERS_FILTER;
  paymentStatusText = Constants.PAYMENT_STATUS_TEXT;
  totalDocs = 0;
  isAdmin = false;
  plannerId; // In case of admin view planner orders
  @ViewChild(SharedDateRangeComponent, { static: false }) dateRangeComponent: SharedDateRangeComponent;
  constructor(
    private readonly modalService: NgbModal,
    private readonly router: Router, private readonly checkRole: CheckRoles,
    private readonly ordersService: OrdersService, private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.plannerId = this.route.snapshot.parent ? this.route.snapshot.parent.params.plannerId : null;
    this.isAdmin = this.checkRole.isAdmin();
    if (this.isAdmin) {
      this.sortingData = Constants.ADMIN_CANCELED_ORDERS_FILTER;
    }
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.paramsLength = Object.keys(params).length;
      this.getOrdersData(params);
    });
  }

  getOrdersData(queryParams) {
    this.canceledOrders$ = this.ordersService.getOrderList({ ...queryParams, status: Constants.PAYMENT_STATUS.CANCELLED },
       this.isAdmin, this.plannerId)
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

  viewQuote(item) {
    const modalRef = this.modalService.open(ViewQuoteRequestComponent, { windowClass: 'modal-extra-large' });
    modalRef.componentInstance.quote = item;
  }

  fetchReport() {
    const roleBasedPayload = this.ordersService.getRoleBasedPayload(this.isAdmin,
      this.plannerId);
    this.ordersService.fetchReport(
      Constants.EXPORTS_DATA.orders.canceled, this.dateRangeComponent, roleBasedPayload)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }

}
