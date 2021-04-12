import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPaginatedData } from '@app/models/IApiResponse';
import { Params, Router, ActivatedRoute } from '@angular/router';

import { Constants } from '@config/constant';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { SharedConfirmationPopupService } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { CommonService } from '@app/core/services/common/common.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { VendorManagementService } from '../../vendor-management/services/vendor-management.service';
import { changeQueryParams } from '@app/core/utils/common.util';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-pending-vendor-list',
  templateUrl: './pending-vendor-list.component.html',
  styleUrls: ['./pending-vendor-list.component.scss'],
  providers: [VendorManagementService]
})
export class PendingVendorListComponent implements OnInit, OnDestroy {
  params: Params;
  public vendorObservable: Observable<IPaginatedData>;
  sortingData = Constants.ADMIN_PENDING_VENDOR_SORTING;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  vendorStatus = Constants.VENDOR_STATUS;
  blankData = Constants.BLANK_HYPHEN;
  paramsLength = 0;
  destroyed$ = new Subject();
  pendingVendorTabs = {
    pending: {
      text: 'Pending Vendors',
      value: this.vendorStatus.completeProfileDetails
    }, rejected: { text: 'Rejected Vendors', value: this.vendorStatus.REJECTED }
  };
  activeTab = this.pendingVendorTabs.pending.value;
  isFilter;
  vendorDocs;
  constructor(
    public readonly vendorManagementService: VendorManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly router: Router, private readonly commonService: CommonService,
    private readonly flash: AlertService,
    private readonly popupService: SharedConfirmationPopupService
  ) { }

  ngOnInit() {
    this.loaderService.start();
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      if (!params.status) {
        this.changeQueryParams({ ...params, status: this.activeTab });
        return;
      }
      this.params = params;
      this.activeTab = Number(params.status);
      if (this.activeTab === this.pendingVendorTabs.rejected.value) {
        this.sortingData = Constants.ADMIN_REJECTED_VENDOR_SORTING;
      }
      this.isFilter = params.filter;
      this.paramsLength = Object.keys(params).length;
      this.getVendorsList(params);
    });
  }

  pageChange(pageNumber) {
    this.changeQueryParams({ page: pageNumber });
  }

  searchVendors(keyword) {
    this.changeQueryParams({ filter: keyword || null });
  }

  sort($event) {
    this.params = { ...this.params, ...$event };
    this.vendorManagementService.pendingVendorRedirect(this.params);
  }

  rejectVendor(id) {
    this.popupService.showPopup(Constants.REJECT_VENDOR).result.then(notCancel => {
      if (!notCancel) {
        this.removeVendor(id);
      }
    }).catch();
  }

  removeVendor(id: string) {
    this.loaderService.start();
    this.vendorManagementService.rejectVendor(id).pipe(takeUntil(this.destroyed$)).subscribe(
      res => {
        this.getVendorsList(this.params);
        this.flash.showSuccess(Messages.SUCCESS.adminvendorReject);
        this.commonService.getHeaderCountApi().pipe(takeUntil(this.destroyed$)).subscribe();
      },
      err => {
        this.loaderService.stop();
      }
    );
  }

  acceptVendor(id: string) {
    this.router.navigateByUrl(`/admin/vendor-management/accept-vendor/${id}`);
  }

  changeQueryParams(params) {
    changeQueryParams(params, this.activatedRoute, this.router);
  }

  chnageTabs(status) {
    this.activeTab = status;
    let params: Params = { status };
    if (this.activeTab === this.pendingVendorTabs.pending.value) {
      params = { ...params, order: -1, sort: 'createdAt', filter: null };
    } else {
      params = { ...params, order: -1, sort: 'updatedAt', filter: null };
      this.sortingData = Constants.ADMIN_REJECTED_VENDOR_SORTING;
    }
    this.changeQueryParams(params);
  }

  getVendorsList(params) {
    this.vendorObservable = this.vendorManagementService.getVendorList('new', params)
      .pipe(map(res => this.vendorDocs = res));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
