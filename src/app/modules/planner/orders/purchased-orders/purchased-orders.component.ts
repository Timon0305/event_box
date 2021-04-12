import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Constants } from '@app/config/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { changeQueryParams, CheckRoles, isEventDetailPage, canCanceledOrder } from '@app/core/utils/common.util';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { MessageApiService } from '@app/modules/message/service/message-api.service';
import { SharedConfirmationPopupService } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { map } from 'rxjs/internal/operators/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewQuoteRequestComponent } from '@app/shared/view-quote-request/view-quote-request/view-quote-request.component';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-purchased-orders',
  templateUrl: './purchased-orders.component.html',
  styleUrls: ['./purchased-orders.component.scss'],
  providers: [MessageApiService]
})
export class PurchasedOrdersComponent implements OnInit, OnDestroy {
  purchasedOrder$;
  paramsLength = 0;
  destroyed$ = new Subject();
  sortingData = Constants.PURCHASED_ORDER_FILTER;
  totalDocs;
  isAdmin = false;
  isEventDetail = false;
  plannerId;
  canCanceledOrder = canCanceledOrder;
  @ViewChild(SharedDateRangeComponent, { static: false }) dateRangeComponent: SharedDateRangeComponent;
  constructor(
    private readonly alertService: AlertService,
    private readonly checkRole: CheckRoles, public readonly modalService: NgbModal,
    private readonly popupService: SharedConfirmationPopupService,
    private readonly router: Router, private readonly messageApiService: MessageApiService,
    private readonly ordersService: OrdersService, private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.plannerId = this.route.snapshot.parent ? this.route.snapshot.parent.params.plannerId : null;
    this.isAdmin = this.checkRole.isAdmin();
    this.isEventDetail = isEventDetailPage(this.router);
    if (this.isAdmin) {
      this.sortingData = Constants.ADMIN_PURCHASED_ORDERS_FILTER;
      if (this.isEventDetail) {
        this.sortingData = Constants.ADMIN_PURCHASED_ORDERS_FILTER.filter(filter => filter.text !== 'Event Label');
      }
    }
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.paramsLength = Object.keys(params).length;
      this.getOrdersData(params);
    });
  }

  getOrdersData(queryParams) {
    if (this.isEventDetail && this.route.snapshot.parent && this.route.snapshot.parent.parent) {
      const event = this.route.snapshot.parent.parent.params.eventViewId;
      queryParams = { ...queryParams, event };
    }
    this.purchasedOrder$ = this.ordersService.getOrderList(
      { ...queryParams, status: Constants.PAYMENT_STATUS.PURCHASED }, this.isAdmin, this.plannerId)
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
  messageVendor(order) {
    const payload = {
      type: Constants.MESSAGE_TYPE.ORDER,
      order
    };
    this.messageApiService.sendMessageAndNavigate(payload)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }

  sort(filter) {
    this.changeQueryParams(filter);
  }

  cancelOrder(orderId) {
    this.popupService.showPopup(Constants.CANCEL_ORDER_POPUP).result.then(notCancel => {
      if (!notCancel) {
        this.ordersService.cancelOrder(orderId).pipe(takeUntil(this.destroyed$))
          .subscribe(res => {
            this.alertService.showSuccess(Messages.SUCCESS.orderCanceled);
            this.getOrdersData(this.route.snapshot.queryParams);
          });
      }
    }).catch();

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  viewQuote(item) {
    const modalRef = this.modalService.open(ViewQuoteRequestComponent, { windowClass: 'modal-extra-large' });
    modalRef.componentInstance.quote = item;
  }

  fetchReport() {
    const roleBasedPayload = this.ordersService.getRoleBasedPayload(this.isAdmin,
      this.plannerId);
    this.ordersService.fetchReport(Constants.EXPORTS_DATA.orders.purchased, this.dateRangeComponent,
      roleBasedPayload)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }

}
