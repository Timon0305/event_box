import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ActivatedRoute, Params } from '@angular/router';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-sort-by-filter',
  templateUrl: './sort-by-filter.component.html',
})
export class SortByFilterComponent implements OnInit, OnDestroy {
  @Input() sortByData;
  readonly destroyed$ = new Subject();
  filterData: Params = {};
  @Output() sortFilterChange = new EventEmitter();
  @Input() fromSearchPage;
  sortBy: FormControl = new FormControl(null);
  sortByField$ = this.sortBy.valueChanges.pipe(
    takeUntil(this.destroyed$)
  );
  constructor(readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.setFieldsValue();
    this.subscribeFieldChanges();
  }

  setFieldsValue(params?) {
    const queryParams = params ? params : this.route.snapshot.queryParams;
    this.filterData = { ...queryParams };
    if (Object.keys(queryParams).length) {
      const { order = null, sort = null } = queryParams;
      if (this.sortByData) {
        const sortObj = this.sortByData.find(data => {
          if ((this.fromSearchPage && data.value.sort === sort) ||
            data.value.order === Number(order) && data.value.sort === sort) {
            return data;
          }
        });
        this.sortBy.setValue(sortObj ? sortObj.id : null);
      }
    }
  }

  subscribeFieldChanges() {
    this.sortByField$.subscribe(value => {
      const sortObj = this.sortByData.find(data => data.id === value);
      this.updateFilterData({ order: null, sort: null, ...(sortObj ? sortObj.value : null) });
    });
  }

  updateFilterData(data) {
    this.filterData.page = Constants.DEFAULT_PAGE;
    this.filterData = { ...this.filterData, ...data };
    this.sortFilterChange.emit(this.filterData);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
