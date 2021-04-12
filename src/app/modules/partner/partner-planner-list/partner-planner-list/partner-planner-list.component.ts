import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PartnerListService } from '@app/modules/admin/partner-list/partner-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Subject } from 'rxjs/internal/Subject';
import { PartnerAddProfileService } from '../../partner-add-profile/services/partner-add-profile.service';
import { Location } from '@angular/common';
import { Constants } from '@app/config/constant';
import { PartnerPlannerTableComponent } from '../partner-planner-table/partner-planner-table.component';

@Component({
  selector: 'app-partner-planner-list',
  templateUrl: './partner-planner-list.component.html',
  styleUrls: ['./partner-planner-list.component.scss'],
})
export class PartnerPlannerListComponent implements OnInit, OnDestroy {
  isFilter;
  destroyed$ = new Subject();
  plannerList;
  loader = false;
  addFixedFooterPaddingClassSidebar = false;
  addFixedFooterClassSidebar = false;
  isAdmin;
  partnerName$;
  partnerDetails$;
  plannerSortFilter = Constants.PARTNER_PLANNER_SORT;
  isVendor;
  isPartner;
  @ViewChild(PartnerPlannerTableComponent, { static: true }) plannerTable: PartnerPlannerTableComponent;
  constructor(
    public readonly loc: Location,
    private readonly addProfileService: PartnerAddProfileService,
    private readonly partnerService: PartnerListService,
    private readonly route: ActivatedRoute, private readonly router: Router
  ) { }

  ngOnInit() {
    this.isAdmin = this.partnerService.isAdmin();
    this.isVendor = this.partnerService.isVendor();
    this.isPartner = this.partnerService.isPartner();
    this.partnerName$ = this.addProfileService.getPartnerName();
    this.partnerDetails$ = this.addProfileService.getPartnerDetailsApi(this.route.snapshot.params.partnerId);
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.isFilter = params.filter;
      this.getPlannerList(params);
    });
  }

  getPlannerList(params) {
    if (this.isAdmin) {
      this.getAdminPartnerPlannerList(params);
    } else if (this.isVendor) {
      this.getVendorPlannerList(params);
    } else {
      this.getPartnerReferPlannerList(params);
    }
  }

  getAdminPartnerPlannerList(params) {
    this.loader = true;
    this.partnerService.getAdminPartnerPlannersList(this.route.snapshot.params.partnerId, params)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.loader = false;
        this.plannerList = res;
      });
  }

  getVendorPlannerList(params) {
    this.loader = true;
    this.partnerService.getVendorInvitesPlannersList(params)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.loader = false;
        this.plannerList = res;
      });
  }

  getPartnerReferPlannerList(params) {
    this.loader = true;
    this.partnerService.getPartnerReferPlanners(params)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.loader = false;
        this.plannerList = res;
      });
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

  pageChange(page) {
    changeQueryParams({ page }, this.route, this.router);
  }

  checkListLen(isCheckList) {
    this.addFixedFooterClassSidebar = isCheckList;
    this.addFixedFooterPaddingClassSidebar = isCheckList;
  }

  unlinkPlanner(payload) {
    this.partnerService.changeAssociation({ ...payload })
      .pipe(takeUntil(this.destroyed$)).subscribe(() => {
        this.plannerTable.checkList = [];
        this.getPlannerList({});
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
