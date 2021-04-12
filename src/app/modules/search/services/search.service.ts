import { Injectable, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { RequestService } from '@app/core/http/request-service';
import { IElasticSearch } from '@app/models/IElasticSearch';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { changeQueryParams } from '@app/core/utils/common.util';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@app/modules/login-signup/login/login.component';
import { map } from 'rxjs/internal/operators/map';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { LoaderService } from '@app/core/services/loader.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class SearchService implements OnDestroy {
  searchConst = Constants.SEARCH_CONSTANTS;
  private readonly destroyed$ = new Subject();
  constructor(
    private readonly loader: LoaderService,
    private readonly request: RequestService, private readonly modalService: NgbModal,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder, private readonly sessionService: SessionManagerService
  ) { }

  getSearchRecord(getParams, isSmallScreenFilter = false) {
    if (getParams && (getParams.maxPrice === '9999' || getParams.maxPrice === 9999)) {
      delete getParams.maxPrice;
    }
    if (!isSmallScreenFilter) {
      this.loader.start();
    }
    return this.request.getWithParams<IElasticSearch>(`${Constants.ENDPOINTS.productsSearch}`, getParams)
      .pipe(map(res => {
        this.loader.stop();
        return res;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  getNewArrivalsRecord() {
    return this.request.get<IElasticSearch>
      (`${Constants.ENDPOINTS.productsSearch}?size=${Constants.NEW_ARRIVAL}&sort=${Constants.SORT_FIELDS.newArrivals}`);
  }

  getHomePageData() {
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.homePage}`);
  }

  updateQueryParams(params: object) {
    const currentUrl = this.router.url.split('?')[0];
    this.router.navigate([currentUrl], {
      queryParams: params
    });
  }

  updateQueryParameters(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  createSearchFilterForm() {
    return this.fb.group({
      location: null, radius: null, willTravel: null, keyword: null,
      latitude: null, longitude: null, minPrice: null, maxPrice: null, ratings: null
    });
  }

  patchQueryParamInSearchFilterForm(obj) {
    obj.form.patchValue({
      keyword: obj.keyword || null,
      location: obj.location || null,
      latitude: obj.latitude || null,
      longitude: obj.longitude || null,
      willTravel: obj.willTravel || '',
      radius: Number(obj.radius) || null,
      minPrice: obj.minPrice || null,
      maxPrice: obj.maxPrice || null,
      ratings: obj.ratings || null
    });
  }

  appendRadius(params) {
    return (params.hasOwnProperty(this.searchConst.LATITUDE) &&
      !params.hasOwnProperty(this.searchConst.RADIUS));
  }

  prepareBreadCrumbs(params) {
    const breadCrumbArr: Array<{ [index: string]: string }> = [];
    Object.keys(params).forEach(key => {
      switch (key) {
        case Constants.SEARCH_CONSTANTS.CATEGORY_NAME:
          breadCrumbArr[Constants.NUMBER.one] = {
            text: params[key],
            route: `/search?category=${params.category}&categoryName=${params.categoryName}`
          };
          break;
        case Constants.SEARCH_CONSTANTS.SUB_CATEGORY_NAME:
          breadCrumbArr[Constants.NUMBER.two] = {
            text: params[key], route: ''
          };
          break;
        case Constants.SEARCH_CONSTANTS.COMPANY:
          breadCrumbArr[Constants.NUMBER.one] = {
            text: params[Constants.SEARCH_CONSTANTS.COMPNAY_NAME], route: ''
          };
          break;
        default:
      }
    });
    breadCrumbArr[Constants.NUMBER.zero] = { text: Constants.SEARCH_CONSTANTS.HOME, route: '/' };
    if (breadCrumbArr.length === Constants.NUMBER.one) {
      breadCrumbArr[Constants.NUMBER.one] = { text: Constants.SEARCH_CONSTANTS.SEARCH, route: '' };
    }
    return breadCrumbArr;
  }

  isUserLoggedIn() {
    return !this.sessionService.getToken() ? this.openLoginPopup() : true;
  }

  openLoginPopup() {
    this.modalService.open(LoginComponent);
    changeQueryParams({ redirectUri: `/search` }, this.route, this.router);
    return false;
  }

  isLocation() {
    let isLocationExist = false;
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(
      params => {
        isLocationExist = params.hasOwnProperty(this.searchConst.LOCATION);
      });
    return isLocationExist;
  }

  getLocationParam() {
    const locationParam = { ...Constants.SET_LOCATION_PARAMETER };
    if (this.isLocation()) {
      this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(
        params => {
          locationParam.location = params.location;
          locationParam.latitude = params.latitude;
          locationParam.longitude = params.longitude;
        });
    }
    return locationParam;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
