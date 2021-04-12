import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef, ViewChild, } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { SearchService } from '../services/search.service';
import { IElasticSearch } from '@app/models/IElasticSearch';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { getProductListCount } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { FormGroup } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';
import { DetailApiService } from '@app/modules/details/services/detail-api.service';
import { MessageApiService } from '@app/modules/message/service/message-api.service';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { SortByFilterComponent } from '@app/shared/sort-by-filter/sort-by-filter/sort-by-filter.component';
import { CommonService } from '@app/core/services/common/common.service';


@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  providers: [SearchService, DetailApiService, MessageApiService],
})

export class SearchFiltersComponent implements OnInit, OnDestroy {
  @ViewChild('searchLocation', { static: true }) location: ElementRef;
  @ViewChild(SortByFilterComponent, { static: true }) filterComponent: SortByFilterComponent;
  private readonly destroyed$ = new Subject();
  public isCollapsed = false;
  filterOpen = false;
  products: IElasticSearch;
  queryStrParams: Params = { ...Constants.ELASTIC_SEARCH_PAGINATION };
  paramsLength = 0;
  productsCount: number;
  items = Constants.SORT_ITEMS;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  sortByData = Constants.SEARCH_LIST_FILTER;
  searchFilterForm: FormGroup;
  distanceInMiles = Constants.DISTANCE_RANGE_MILES;
  searchByFilter = Constants.SEARCH_BY;
  ratingFilter = Constants.RATING_FILTER;
  searchConst = Constants.SEARCH_CONSTANTS;
  checkCompanyKeyExist = false;
  isSearchInfoVisible = false;
  getCategoryName = '';
  dynamicBreadcrumb: Array<{ [index: string]: string }> = [];
  minValue = Constants.SLIDER_RANGE.MINVALUE;
  maxValue = Constants.SLIDER_RANGE.MAXVALUE;
  isLocationExist = false;
  isResponsiveFilter = false;
  prevQueryStrParams = {};
  options: Options = {
    floor: Constants.SLIDER_FLOOR,
    ceil: Constants.SLIDER_CEIL,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.High:
        case LabelType.Ceil:
          return ((Number(value) < Constants.SLIDER_CEIL) ? `${value}` : `${value}+`);
        default:
          return `${value}`;
      }
    }
  };

  constructor(
    private readonly route: ActivatedRoute, private readonly detailApiService: DetailApiService,
    private readonly messageApiService: MessageApiService, private readonly sessionService: SessionManagerService,
    private readonly loaderService: LoaderService,
    private readonly searchService: SearchService,
    private readonly commonService: CommonService,
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.searchFilterForm = this.searchService.createSearchFilterForm();
    this.setValueInSearchBy();
    this.getResetFilter();
    this.subscribeQueryParams();
  }

  subscribeQueryParams() {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(
      params => {
        this.paramsLength = Object.keys(params).length;
        this.queryStrParams = { ...this.queryStrParams, ...params };
        if (this.searchService.appendRadius(params)) {
          this.setRadius();
          return;
        }
        this.resetQueryStrParam(params);
        this.setPriceSlider(params);
        this.getSearchRecord(this.queryStrParams);
        this.searchService.patchQueryParamInSearchFilterForm({ ...params, form: this.searchFilterForm });
        this.dynamicBreadcrumb = this.searchService.prepareBreadCrumbs(params);
      });
  }

  setValueInSearchBy() {
    this.searchFilterForm.patchValue(Constants.SET_SEARCH_PARAMETER);
  }
  getResetFilter() {
    this.isResponsiveFilter = this.commonService.getResponsive(Constants.RESPONSIVE_WINDOW_MIN_WIDTH.INNERWIDTH);
    this.sessionService.getResetFilter().pipe(takeUntil(this.destroyed$)).subscribe(
      res => {
        if (res) {
          this.resetFilteredData();
          this.filterComponent.setFieldsValue({ sort: null });
        }
      });
  }

  onChangeSlider(event) {
    this.applySearch(true);
  }

  priceChange() {
    this.searchFilterForm.controls.minPrice.valueChanges.pipe(
      debounceTime(Constants.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    )
      .subscribe(keyword => {
        this.applySearch();
      });

    this.searchFilterForm.controls.maxPrice.valueChanges.pipe(
      debounceTime(Constants.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    )
      .subscribe(keyword => {
        this.applySearch();
      });
  }
  manageRadius() {
    if (!this.queryStrParams.hasOwnProperty(this.searchConst.LATITUDE)) {
      this.searchFilterForm.controls.radius.reset();
      this.searchFilterForm.controls.radius.disable();
      this.searchFilterForm.controls.willTravel.disable();
    } else {
      this.searchFilterForm.controls.radius.enable();
      this.searchFilterForm.controls.willTravel.enable();
    }
  }

  setRadius() {
    this.searchFilterForm.patchValue(Constants.SET_RADIUS);
    this.searchService.updateQueryParameters(Constants.SET_RADIUS);
  }

  setPriceSlider(params?) {
    this.minValue = (params.minPrice) ? params.minPrice : Constants.SLIDER_RANGE.MINVALUE;
    this.maxValue = (params.maxPrice) ? params.maxPrice : Constants.SLIDER_RANGE.MAXVALUE;
    if (Number(params.minPrice) === Constants.SLIDER_RANGE.MAXVALUE) {
      delete this.queryStrParams.maxPrice;
    }
  }

  applySearch(fromSearchSideFilter?) {
    let formValue = this.searchFilterForm.getRawValue();
    if (fromSearchSideFilter) {
      formValue = { ...formValue, ...Constants.ELASTIC_SEARCH_PAGINATION };
    }
    this.searchService.updateQueryParameters(formValue);
  }

  resetFilteredData() {
    this.searchFilterForm.reset();
    delete this.queryStrParams[this.searchConst.RATINGS];
    this.setValueInSearchBy();
    this.manageRadius();
  }

  clearAllFilter() {
    this.resetFilteredData();
    this.sessionService.setCurrentLocaton({});
    this.applySearch(true);
  }

  counter(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }

  getSearchRecord(queryStrParams) {
    let getQueryStrParams = Object.assign({}, queryStrParams);
    if (queryStrParams.willTravel === 'true') {
      getQueryStrParams = Object.assign({}, queryStrParams, { willTravel: '' });
    }
    this.searchService.getSearchRecord(getQueryStrParams, this.isResponsiveFilter).pipe(takeUntil(this.destroyed$)).subscribe(
      res => {
        this.products = res;
        this.productsCount = getProductListCount(this.products);
        this.cd.detectChanges();
      });
  }

  onFilterClick() {
    this.prevQueryStrParams = {};
    this.filterOpen = !(this.filterOpen);
    if (this.filterOpen && this.isResponsiveFilter) {
      Object.assign(this.prevQueryStrParams, this.queryStrParams);
    }
  }

  onFilterBack() {
    this.searchService.updateQueryParameters(this.prevQueryStrParams);
    this.onFilterClick();
  }

  resetQueryStrParam(queryParams) {
    this.removeQueryStrParam(queryParams, this.searchConst.SUBCATEGORY);
    this.removeQueryStrParam(queryParams, this.searchConst.KEYWORD);
    this.removeQueryStrParam(queryParams, this.searchConst.COMPANY);
    this.removeQueryStrParam(queryParams, this.searchConst.SORT);
    if (!queryParams.hasOwnProperty(this.searchConst.CATEGORY)) {
      delete this.queryStrParams[this.searchConst.CATEGORY];
      delete this.queryStrParams[this.searchConst.SUBCATEGORY];
    }
    if (!queryParams.hasOwnProperty(this.searchConst.LOCATION)) {
      this.resetLocationQueryStrParam();
    }
    this.checkKeyExist(queryParams);
  }

  removeQueryStrParam(obj, key) {
    if (!obj.hasOwnProperty(key)) {
      delete this.queryStrParams[key];
    }
  }

  resetLocationQueryStrParam() {
    delete this.queryStrParams[this.searchConst.LOCATION];
    delete this.queryStrParams[this.searchConst.LATITUDE];
    delete this.queryStrParams[this.searchConst.LONGITUDE];
    delete this.queryStrParams[this.searchConst.RADIUS];
  }

  checkKeyExist(queryParams) {
    this.getCategoryName = (queryParams.subCategoryName) ? queryParams.subCategoryName : queryParams.categoryName;
    this.checkCompanyKeyExist = Constants.SEARCH_CONSTANTS.COMPANY in queryParams;
    this.manageRadius();
  }

  pageChange(pageNumber) {
    this.queryStrParams.page = (pageNumber) ? pageNumber : this.queryStrParams.page;
    this.queryStrParams.from = (Constants.ELASTIC_SEARCH_PAGINATION.size * (this.queryStrParams.page - 1));
    this.searchService.updateQueryParameters(this.queryStrParams);
  }

  sortFilterChange(filter) {
    filter = { ...filter, ...Constants.ELASTIC_SEARCH_PAGINATION };
    this.searchService.updateQueryParameters(filter);
  }

  messageVendor() {
    if (this.searchService.isUserLoggedIn()) {
      const payload = {
        type: Constants.MESSAGE_TYPE.TEXT,
        vendor: this.route.snapshot.queryParams.company
      };
      this.messageApiService.sendMessageAndNavigate(payload)
        .pipe(takeUntil(this.destroyed$))
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get isVendor() {
    return this.sessionService.getRole() === Constants.Role.VENDOR;
  }

  get isAdmin() {
    return this.sessionService.getRole() === Constants.Role.ADMIN;
  }

}
