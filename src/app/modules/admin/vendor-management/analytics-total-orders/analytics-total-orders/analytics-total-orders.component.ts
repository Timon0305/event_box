import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Constants } from '@app/config/constant';
import { VendorManagementService } from '../../services/vendor-management.service';

@Component({
  selector: 'app-analytics-total-orders',
  templateUrl: './analytics-total-orders.component.html',
  styleUrls: ['./analytics-total-orders.component.scss'],
  providers: [VendorManagementService]
})
export class AnalyticsTotalOrdersComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  ordersType = Constants.ORDER_TYPES;
  activeTab =  Constants.ORDER_TYPES.NEW_ORDERS;
  vendorId;
  companyId;
  vendorName;
  constructor(private readonly route: ActivatedRoute, private readonly vendorMgmtService: VendorManagementService,
              private readonly router: Router) { }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.activeTab = params.type;
    });
    this.vendorId = this.route.snapshot.paramMap.get('id');
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.getVendorName();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getVendorName() {
    if (this.vendorId) {
      this.vendorMgmtService.getVendorName(this.vendorId)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.vendorName = res.vendorName;
        });
    }
  }

  navigateAllOrders(orderType) {
    this.router.navigate(
      [`${Constants.APPLICATION_ROUTES.admin.vendorManagement}/${this.vendorId}${Constants.APPLICATION_ROUTES.admin.adminVendorAllOrders}`,
      this.companyId],
      { queryParams:
        { role: Constants.Role.VENDOR, id: this.companyId, type: orderType} }
    );
  }

}
