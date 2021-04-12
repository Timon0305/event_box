import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorManagementService } from '../../services/vendor-management.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss', '../../view-vendor/view-vendor.component.scss']
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  @Input() vendorDetail;
  vendorId;
  readonly destroyed$ = new Subject();
  numbers = Constants.NUMBER;
  vendorAnalyticsObservable$;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly vendorManagementService: VendorManagementService,
    private router: Router
  ) { }

  ngOnInit() {
    this.vendorId = this.activatedRoute.snapshot.paramMap.get('id');
    this.vendorAnalyticsObservable$ = this.vendorManagementService.getVendorAnalyticsId(this.vendorId);
  }

  navigateAllQuotes(commpanyId?) {
    this.router.navigate(
      [`${Constants.APPLICATION_ROUTES.admin.vendorManagement}/${this.vendorId}${Constants.APPLICATION_ROUTES.admin.adminVendorAllQuotes}`,
       commpanyId],
      { queryParams:
        { role: Constants.Role.VENDOR, id: commpanyId, type: Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES, order: Constants.NUMBER.one } }
    );
  }

  navigateAllOrders(cmpId) {
    this.router.navigate(
      [`${Constants.APPLICATION_ROUTES.admin.vendorManagement}/${this.vendorId}${Constants.APPLICATION_ROUTES.admin.adminVendorAllOrders}`,
      cmpId],
      { queryParams:
        { role: Constants.Role.VENDOR, id: cmpId, type: Constants.ORDER_TYPES.NEW_ORDERS} }
    );
  }

  navigateToProducts(cmpId) {
    this.router.navigate(
      [
        `${Constants.APPLICATION_ROUTES.admin.vendorManagement}/${this.vendorId}/${cmpId}${Constants.APPLICATION_ROUTES.admin.products}`
      ],
      { queryParams:
        { role: Constants.Role.VENDOR, id: cmpId} }
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
