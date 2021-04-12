import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { DashboardService } from '../dashboard.service';
import { ExportService } from '@app/core/services/common/export.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss'],
  providers: [DashboardService]
})
export class NewOrdersComponent implements OnInit, OnDestroy {
  purchasedOrder$;
  destroyed$ = new Subject();
  mapTimezone = Constants.TIME_ZONE_DISPLAY_MAP;
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly exportService: ExportService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.purchasedOrder$ = this.dashboardService.getOrderList(
      { status: Constants.PAYMENT_STATUS.PURCHASED }, true)
      .pipe(map(res => {
        return res.data.docs.splice(0, Constants.NEW_ORDERS_ADMIN_DASHBOARD);
      }));
  }

  export() {
    this.exportService.export(
      {
        exportType: Constants.EXPORTS_DATA.orders.exportType,
        status: Constants.EXPORTS_DATA.orders.purchased
      }).pipe(takeUntil(this.destroyed$)).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
