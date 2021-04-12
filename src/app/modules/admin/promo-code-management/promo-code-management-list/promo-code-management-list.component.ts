import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '@config/constant';
import { IPaginatedData } from '@app/models/IApiResponse';
import { PromoCodeManagementService } from '../services/promo-code-management.service';
import { Observable } from 'rxjs/internal/Observable';
import { AssociateVendorsComponent } from '../associate-vendors/associate-vendors.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { SharedConfirmationPopupService } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { IModalMetaData } from '@app/models/popUpMeta';
import { Messages } from '@app/config/messages';
import { AlertService } from '@app/modules/alert-messages/alert.service';

@Component({
  selector: 'app-promo-code-management-list',
  templateUrl: './promo-code-management-list.component.html',
  styleUrls: ['./promo-code-management-list.component.scss'],
  providers: [ PromoCodeManagementService ]
})
export class PromoCodeManagementListComponent implements OnInit {
  public promoCodeObservable: Observable<IPaginatedData>;
  params: Params;
  sortingData = Constants.ADMIN_PROMO_CODE_SORTING;
  promoCodeConst = Constants.PROMO_CODE;
  paramsLength = 0;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  constructor(
    private readonly modalService: NgbModal,
    private readonly promoCodeManagementService: PromoCodeManagementService,
    private readonly popupService: SharedConfirmationPopupService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly router: Router,
    private readonly flash: AlertService
    ) { }

  ngOnInit() {
    this.loaderService.start();
    this.promoCodeObservable = this.promoCodeManagementService.getPromoCodeList();
    this.activatedRoute.queryParams.subscribe(params => {
      this.paramsLength = Object.keys(params).length;
      this.params = params;
      this.promoCodeObservable = this.promoCodeManagementService.getPromoCodeList(params);
    });
  }

  pageChange(pageNumber) {
    this.params = Object.assign({}, this.params);
    this.params.page = pageNumber;
    this.promoCodeManagementService.redirect(this.params);
  }

  searchpromoCode(keyword) {
    this.params = Object.assign({});
    this.params.filter = keyword;
    this.promoCodeManagementService.redirect(this.params);
  }

  sortPromoCode($event) {
    this.params = {...this.params, ...$event};
    this.promoCodeManagementService.redirect(this.params);
  }

  editPromoCode(id: string) {
    this.router.navigateByUrl(`/admin/promo-code-management/save/${id}`);
    return;
  }

  deletePromoCode(id) {
    this.popupService.showPopup(Constants.DELETE_PROMO_CODE).result.then(notCancel => {
      if (!notCancel) {
        this.delete(id);
      }
    }).catch();
  }

  delete(id: string) {
    this.loaderService.start();
    this.promoCodeManagementService.deletePromoCode(id).subscribe(
      res => {
        this.flash.showSuccess(Messages.SUCCESS.adminPromoCodeDelete);
        this.loaderService.stop();
        this.promoCodeObservable = this.promoCodeManagementService.getPromoCodeList(this.params);
      },
      res => {
        this.loaderService.stop();
      }
    );
  }

  viewAllAssociatedVendors(associatedVendors) {
    const modalRef = this.modalService.open(AssociateVendorsComponent, { centered: true });
    modalRef.componentInstance.associateVendors = associatedVendors;
  }

}
