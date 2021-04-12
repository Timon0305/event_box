import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PartnerListService } from '@app/modules/admin/partner-list/partner-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { changeQueryParams } from '@app/core/utils/common.util';
import { map } from 'rxjs/internal/operators/map';
import { Constants } from '@app/config/constant';
import { PartnerAddProfileService } from '../../partner-add-profile/services/partner-add-profile.service';
import { Location } from '@angular/common';
import { PartnerVendorTableComponent } from '../partner-vendor-table/partner-vendor-table.component';

@Component({
  selector: 'app-partner-vendor-list',
  templateUrl: './partner-vendor-list.component.html',
  styleUrls: ['./partner-vendor-list.component.scss'],
})
export class PartnerVendorListComponent implements OnInit, OnDestroy {
  vendorList$;
  loader = false;
  destroyed$ = new Subject();
  isFilter;
  vendorList;
  addFixedFooterClassSidebar = false;
  addFixedFooterPaddingClassSidebar = false;
  vendorListSort = Constants.PARTNER_VENDOR_SORT;
  isAdmin;
  partnerName$;
  partnerDetails$;
  isPartner;
  @ViewChild(PartnerVendorTableComponent, {static: false}) vendorTable: PartnerVendorTableComponent;
  constructor(
    public readonly loc: Location,
    private readonly addProfileService: PartnerAddProfileService,
    private readonly partnerService: PartnerListService,
    private readonly route: ActivatedRoute, private readonly router: Router
  ) { }

  ngOnInit() {
    this.partnerName$ = this.addProfileService.getPartnerName();
    this.isPartner = this.partnerService.isPartner();
    this.partnerDetails$ = this.addProfileService.getPartnerDetailsApi(this.route.snapshot.params.partnerId);
    this.isAdmin = this.partnerService.isAdmin();
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.isFilter = params.filter;
      this.getVendorListData(params);
    });
  }

  getVendorListData(params) {
    if (this.isAdmin) {
      this.getAdminPartnerVendorList(params);
    } else {
      this.getPartnerReferVendorList(params);
    }
  }

  getAdminPartnerVendorList(params) {
    this.loader = true;
    this.vendorList$ = this.partnerService.getAdminPartnerVendorsList(this.route.snapshot.params.partnerId, params)
      .pipe(map(res => {
        this.loader = false;
        this.vendorList = res;
        return res;
      }));
  }

  getPartnerReferVendorList(params) {
    this.loader = true;
    this.vendorList$ = this.partnerService.getPartnerReferVendors(params)
      .pipe(map(res => {
        this.loader = false;
        this.vendorList = res;
        return res;
      }));
  }

  sortFilterChange(sort) {
    this.changeQueryParams(sort);
  }

  changeQueryParams(params) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  search(keyword) {
    this.changeQueryParams({ filter: keyword || null });
  }
  unlinkVendors(payload) {
    this.partnerService.changeAssociation({ ...payload }).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.vendorTable.checkList = [];
      this.getVendorListData({});
    });
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  pageChange(page) {
    changeQueryParams({ page }, this.route, this.router);
  }

  checkListLen(isCheckList) {
    this.addFixedFooterClassSidebar = isCheckList;
    this.addFixedFooterPaddingClassSidebar = isCheckList;
  }
}
