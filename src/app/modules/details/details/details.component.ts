import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app/core/services/common/common.service';
import { SearchService } from '@modules/search/services/search.service';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailApiService } from '../services/detail-api.service';
import { getProductListCount, getProductPublicDetailBreadcrumbs, CheckRoles, changeQueryParams } from '@app/core/utils/common.util';
import { SelectEventPopupComponent } from '../select-event-popup/select-event-popup.component';
import { Constants } from '@app/config/constant';
import { IElasticSearch } from '@app/models/IElasticSearch';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { LoaderService } from '@app/core/services/loader.service';
import { VariablePopupOpenService } from '../services/variable-popup-open.service';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { Location } from '@angular/common';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DetailApiService, SearchService]
})

export class DetailsComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject();
  products: IElasticSearch;
  productsCount: number;
  productServiceDetail;
  pages = Constants.PAGES;
  dynamicBreadcrumb: Array<{ [index: string]: string }> = [];
  isAdmin = false;
  ratingNreviewObservable$;
  navigationFrom;
  mobileOnlyReview;
  constructor(
    private readonly detailApiService: DetailApiService,
    private readonly router: Router, private readonly checkRole: CheckRoles,
    private readonly modalService: NgbModal, private readonly variablePopupOpen: VariablePopupOpenService,
    private readonly sessionService: SessionManagerService,
    private readonly searchService: SearchService,
    private readonly commonService: CommonService,
    private readonly loaderService: LoaderService,
    private readonly flash: AlertService,
    public readonly route: ActivatedRoute,
    readonly location: Location) { }

  ngOnInit() {
    this.isAdmin = this.checkRole.isAdmin();
    this.mobileOnlyReview = this.commonService.getResponsive(Constants.RESPONSIVE_WINDOW_MIN_WIDTH.MOBILE_ONLY_REVIEWS);
    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe(routeParams => {
      this.getPublicProductServiceData(routeParams.id);
    });

    this.route.queryParams.pipe(takeUntil(this.destroyed$), debounceTime(Constants.QUOTE_REQUEST_PROCESS_DEBOUNCE)).subscribe(params => {
      this.navigationFrom = params.navigationFrom;
      this.checkIfOpenPopup(params);
    });
  }

  getPublicProductServiceData(productID?: string) {
    this.loaderService.start();
    this.commonService.getPublicProductServiceRecord(productID).
      pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.productServiceDetail = res;
        this.productServiceDetail.data.detailPage = Constants.SEARCH_CONSTANTS.DETAILPAGE;
        this.dynamicBreadcrumb = this.prepareDynamicBreadCrumbs(this.productServiceDetail.data);
        this.getCompanyRecord(this.productServiceDetail.data.company._id, productID);
        this.ratingNreviewObservable$ = this.commonService.getProductReviews(productID, { limit: Constants.NUMBER.ten });
        // check if to open varibale popup
        if (this.route.snapshot.queryParams.eventId) {
          this.openVariable();
        } else {
          this.loaderService.stop();
        }
      }, error => {
        this.loaderService.stop();
        if (error.error.message === Constants.PRODUCT_NOT_FOUND) {
          this.flash.showError(Messages.ERROR.productNotFound);
          this.router.navigateByUrl('/');
        }
      });
  }

  checkIfOpenPopup(params) {
    if (params.openSelectEvent && this.productServiceDetail) {
      this.initiateQuoteRequestProcess(this.productServiceDetail.data);
    }
  }

  openVariable() {
    let eventTimezone = '';
    const categoryAndEventName
      = { categoryName: this.productServiceDetail.data.category.name, eventName: '' };
    const varibaleApiParams
      = this.variablePopupOpen.getVariableApiParams(this.productServiceDetail.data);
    const productAndVendorName = this.variablePopupOpen.getProductAndVendorName(this.productServiceDetail.data);
    this.detailApiService.getEventById(this.route.snapshot.queryParams.eventId)
      .pipe(mergeMap(res => {
        categoryAndEventName.eventName = res.name;
        varibaleApiParams.event = res._id;
        eventTimezone = res.eventTimezone;
        return this.detailApiService.getPreQuoteDetails({
          category:
            varibaleApiParams.category, event: res._id, product: varibaleApiParams.product
        });
      })).pipe(takeUntil(this.destroyed$)).subscribe(variableInfo => {
        this.loaderService.stop();
        this.variablePopupOpen.openVaribalePopup({
          preQuoteDetails: variableInfo.data, categoryAndEventName,
          varibaleApiParams, productAndVendorName,
          eventTimezone

        });
      }, err => this.loaderService.stop());
  }

  getCompanyRecord(companyId?: string, productID?: string) {
    this.searchService.getSearchRecord({ company: companyId, other: productID, size: Constants.PRODUCT_COUNT }).
      pipe(takeUntil(this.destroyed$)).subscribe(result => {
        this.products = result;
        this.productsCount = getProductListCount(this.products);
      });
  }

  prepareDynamicBreadCrumbs(params) {
    const breadCrumbArr: Array<{ [index: string]: string }> = [];
    return getProductPublicDetailBreadcrumbs(breadCrumbArr, params);
  }

  navigateToSearch({ company, companyName }) {
    this.router.navigate(['/search'], {
      queryParams: {
        company,
        companyName
      }
    });
  }

  initiateQuoteRequestProcess(productData) {
    const redirectUri = this.route.snapshot.queryParams.location ? `${this.router.url}&openSelectEvent=true` : null;
    if (this.detailApiService.isUserLoggedIn(redirectUri) && !(this.isVendor || this.isAdmin)) {
      const productAndVendorName = this.variablePopupOpen.getProductAndVendorName(this.productServiceDetail.data);
      const modalRef = this.modalService.open(SelectEventPopupComponent, { centered: true });
      modalRef.componentInstance.varibaleApiParams
        = this.variablePopupOpen.getVariableApiParams(productData);
      modalRef.componentInstance.categoryName = productData.category.name;
      modalRef.componentInstance.productAndVendorName = productAndVendorName;
      modalRef.result.then(() => this.resetQueryParams()).catch(() => this.resetQueryParams());
    }
  }

  resetQueryParams() {
    this.variablePopupOpen.resetQueryParams({ openSelectEvent: null });
  }

  get isVendor() {
    return this.sessionService.getRole() === Constants.Role.VENDOR;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
