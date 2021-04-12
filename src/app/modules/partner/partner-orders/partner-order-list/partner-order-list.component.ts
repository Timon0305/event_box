import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { PartnerListService } from '@app/modules/admin/partner-list/partner-list.service';
import { map } from 'rxjs/internal/operators/map';
import { PartnerAddProfileService } from '../../partner-add-profile/services/partner-add-profile.service';
import { Location } from '@angular/common';
import { ExportService } from '@app/core/services/common/export.service';

@Component({
  selector: 'app-partner-order-list',
  templateUrl: './partner-order-list.component.html',
  styleUrls: ['./partner-order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerOrderListComponent implements OnInit, OnDestroy {
  activeTab = null;
  destroyed$ = new Subject();
  partnerOrderTypes = Constants.PARTNER_ORDER_TYPES;
  partnerOrderList$;
  partnerOrderList;
  isAdmin;
  isFilter;
  loader;
  partnerName$;
  partnerDetails$;
  constructor(
    private readonly exportService: ExportService,
    public readonly loc: Location,
    private readonly addProfileService: PartnerAddProfileService,
    private readonly partnerListService: PartnerListService,
    public readonly activatedRoute: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.partnerName$ = this.addProfileService.getPartnerName();
    this.partnerDetails$ = this.addProfileService.getPartnerDetailsApi(this.activatedRoute.snapshot.params.partnerId);
    this.isAdmin = this.partnerListService.isAdmin();
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.activeTab = params.type;
      this.isFilter = params.filter;
      if (!params.type) {
        params = { ...params, type: this.partnerOrderTypes.vendorOrders };
      }
      this.getOrdersList(params);
    });
  }

  changeTab(tab) {
    this.changeQueryParams({ type: tab, page: null, filter: null, order: null, sort: null });
  }
  changeQueryParams(params) {
    changeQueryParams({ ...params }, this.activatedRoute, this.router);
  }

  getOrdersList(params) {
    if (this.isAdmin) {
      this.getAdminPartnerOrdersList(params);
    } else {
      this.getPartnerReferOrdersList(params);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getAdminPartnerOrdersList(params) {
    this.loader = true;
    this.partnerOrderList$ =
      this.partnerListService.getAdminPartnerOrders
        (this.activatedRoute.snapshot.params.partnerId, params)
        .pipe(map(res => {
          this.loader = false;
          this.partnerOrderList = res;
          return res;
        }));
  }

  getPartnerReferOrdersList(params) {
    this.loader = true;
    this.partnerOrderList$ =
      this.partnerListService.getPartnerReferOrders
        (params)
        .pipe(map(res => {
          this.loader = false;
          this.partnerOrderList = res;
          return res;
        }));
  }

  downloadCsv() {
    this.exportService.export(
      {
        exportType: Constants.EXPORTS_DATA.payout.exportType,
        type: this.activatedRoute.snapshot.queryParams.type
      }
    )
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }


}
