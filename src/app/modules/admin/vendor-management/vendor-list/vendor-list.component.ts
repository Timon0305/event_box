import { Component, OnInit, OnDestroy } from '@angular/core';
import { VendorManagementService } from '../services/vendor-management.service';
import { IPaginatedData } from '@app/models/IApiResponse';

import { ActivatedRoute, Params } from '@angular/router';
import { Constants } from '@app/config/constant';
import { LoaderService } from '@app/core/services/loader.service';
import { SharedConfirmationPopupService } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { IModalMetaData } from '@app/models/popUpMeta';
import { Messages } from '@app/config/messages';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Observable } from 'rxjs/internal/Observable';
import { ExportService } from '@app/core/services/common/export.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { toggleCheck } from '@app/core/utils/common.util';
import { PartnerListPopupComponent } from '@app/shared/partner-list-opup/partner-list-popup/partner-list-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss'],
  providers: [VendorManagementService]
})
export class VendorListComponent implements OnInit, OnDestroy {
  params: Params;
  public vendorObservable: Observable<IPaginatedData>;
  sortingData = Constants.ADMIN_VENDOR_SORTING;
  constNumber = Constants.NUMBER;
  blankData = Constants.BLANK_HYPHEN;
  percentSign = Constants.PROMO_CODE.PERCENT_SIGN;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  viewVendorProfileRoute = Constants.APPLICATION_ROUTES.admin.vendorView;
  destroyed$ = new Subject();
  addFixedFooterClassSidebar = false;
  addFixedFooterPaddingClassSidebar = false;
  checkList: Array<string> = [];
  constructor(
    private readonly modalService: NgbModal,
    public readonly vendorManagementService: VendorManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly sharedConfirmationPopupService: SharedConfirmationPopupService,
    private readonly flash: AlertService, private readonly exportService: ExportService
  ) { }

  ngOnInit() {

    this.loaderService.start();
    this.vendorObservable = this.vendorManagementService.getVendorList('');
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      this.vendorObservable = this.vendorManagementService.getVendorList('', params);
    });
  }

  pageChange(pageNumber) {
    this.params = Object.assign({}, this.params);
    this.params.page = pageNumber;
    this.vendorManagementService.redirect(this.params);
  }

  searchVendors(keyword) {
    this.params = Object.assign({});
    this.params.filter = keyword;
    this.vendorManagementService.redirect(this.params);
  }

  sort($event) {
    this.params = { ...this.params, ...$event };
    this.vendorManagementService.redirect(this.params);
  }

  askVendorStatusChange(id: string, status: number) {
    const imgPath = (status) ? 'assets/images/delete-user.svg' : 'assets/images/user_active_icon.svg';
    this.sharedConfirmationPopupService.showPopup({
      title: `${status ? 'Inactivate' : 'Activate'} Vendor`,
      text: `Do you want to ${status ? 'Inactivate' : 'Activate'} this vendor from the list?`,
      leftButton: 'Yes',
      rightButton: 'No',
      imageSrc: imgPath
    } as IModalMetaData).result.then(notCancel => {
      if (!notCancel) {
        this.changeVendorStatus(id, status ? 0 : 1);
      }
    });
  }

  changeVendorStatus(id: string, status) {
    this.loaderService.start();
    this.vendorManagementService.changeVendorStatus(id, status).subscribe(
      res => {
        this.loaderService.stop();
        this.flash.showSuccess(Messages.SUCCESS.adminVendorStatus);
        this.vendorObservable = this.vendorManagementService.getVendorList('', this.params);
      },
      err => {
        this.loaderService.stop();
      }
    );
  }

  export() {
    this.exportService.export(
      {
        exportType: Constants.EXPORTS_DATA.vendors,
        ...Constants.EXPORTS_DATA.vendorListAdmin.extraParams
      }
    )
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }

  toggleCheck(event, id) {
    this.checkList = toggleCheck({ event, id, checkList: this.checkList });
    this.addFixedFooterClassSidebar = this.checkList.length > 0;
    this.addFixedFooterPaddingClassSidebar = this.checkList.length > 0;
  }

  initiateAssociationChange() {
    const modalRef = this.modalService.open(PartnerListPopupComponent, { size: 'sm', windowClass: 'partner-list-modal' });
    modalRef.componentInstance.usersIdToAssociate = this.checkList;
    modalRef.componentInstance.role = Constants.Role.VENDOR;
    modalRef.result.then(res => {
      if (res) {
        this.checkList = [];
        this.pageChange(1);
      }
    }).catch(res => res);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
