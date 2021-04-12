import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Constants } from '@app/config/constant';
import { CommonService } from '@app/core/services/common/common.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { SortByFilterComponent } from '@app/shared/sort-by-filter/sort-by-filter/sort-by-filter.component';


@Component({
  selector: 'app-product-services-filters',
  templateUrl: './product-services-filters.component.html',
  styleUrls: ['./product-services-filters.component.scss'],
})
export class ProductServicesFiltersComponent implements OnInit, OnDestroy {
  sortByData = Constants.PRODUCT_LIST_SORT_BY;
  subCategory = [];
  items = [];
  readonly destroyed$ = new Subject();
  filterData: Params = {};
  statusFilter = Constants.PRODUCT_STATUS_FILTER;
  categories;
  isResponsiveFilter = false;
  @Input() productFilter;
  @Output() productFilterClose = new EventEmitter<boolean>();
  @Input() set setCategories(value) {
    this.categories = value || [];
    this.subCategory = this.categories.filter(categoryObj => categoryObj._id === this.filterData.category)
      .map(mappedData => mappedData.children)[0];
  }
  categoryField: FormControl = new FormControl(null);
  subCategoryField: FormControl = new FormControl(null);
  status: FormControl = new FormControl(null);
  @Output() filterChange = new EventEmitter();
  @ViewChild(SortByFilterComponent, { static: true }) sortByFilterComponent: SortByFilterComponent;
  @Input() isVendor;
  categoryField$ = this.categoryField.valueChanges.pipe(
    takeUntil(this.destroyed$)
  );

  subCategoryField$ = this.subCategoryField.valueChanges.pipe(
    takeUntil(this.destroyed$)
  );

  statusField$ = this.status.valueChanges.pipe(
    takeUntil(this.destroyed$)
  );
  constructor(readonly route: ActivatedRoute, readonly commonService: CommonService, readonly fb: FormBuilder) { }

  ngOnInit() {
    if (!this.isVendor) {
      this.sortByData = Constants.ADMIN_PRODUCT_LIST_SORT_BY;
    }
    this.isResponsiveFilter = this.commonService.getResponsive(Constants.RESPONSIVE_WINDOW_MIN_WIDTH.VENDOR_MYPRODUCT_FILTER);
    this.setFieldsValue();
    this.subscribeFieldChanges();
  }

  categoryChanged(event) {
    if (!(this.isResponsiveFilter && !event)) {
      this.subCategory = event && event.children || [];
    }
  }

  updateFilterData(data, skipResponsiveLogic = false) {
    this.filterData = { ...this.filterData, ...data };
    if (!this.isResponsiveFilter || skipResponsiveLogic) {
      this.filterChange.emit(this.filterData);
    }
  }

  onResponsiveFilter() {
    if (this.isResponsiveFilter) {
      if (!this.filterData.category) {
        this.subCategory = [];
      }
      this.filterChange.emit(this.filterData);
      this.closeFilter();
    }
  }

  setFieldsValue() {
    const queryParams = this.route.snapshot.queryParams;
    this.filterData = { ...queryParams };
    if (Object.keys(queryParams).length) {
      const { category = null, subCategory = null, isArchive = null } = queryParams;
      this.categoryField.setValue(category);
      this.subCategoryField.setValue(subCategory);
      if (isArchive === 'false') {
        this.status.setValue(false);
      } else if (isArchive === 'true') {
        this.status.setValue(true);
      } else {
        this.status.setValue(null);
      }
    }
    if (this.sortByFilterComponent) {
      this.sortByFilterComponent.setFieldsValue();
    }
  }

  subscribeFieldChanges() {
    this.categoryField$.subscribe(value => {
      this.updateFilterData({ category: value });
      this.subCategoryField.setValue(null);
    });
    this.statusField$.subscribe(value =>
      this.updateFilterData({ isArchive: value })
    );
    this.subCategoryField$.subscribe(value => this.updateFilterData({ subCategory: value }));
  }

  sortFilterChange(event) {
    this.updateFilterData(event, true);
  }

  closeFilter() {
    this.productFilterClose.emit(false);
  }

  cancel() {
    if (!this.route.snapshot.queryParams.category) {
      this.subCategory = [];
    }
    this.setFieldsValue();
    this.closeFilter();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


}
