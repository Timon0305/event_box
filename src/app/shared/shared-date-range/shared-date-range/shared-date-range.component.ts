import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Constants } from '@app/config/constant';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { changeQueryParams } from '@app/core/utils/common.util';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePickerComponent } from 'ng2-date-picker';
@Component({
  selector: 'app-shared-date-range',
  templateUrl: './shared-date-range.component.html'
})
export class SharedDateRangeComponent implements OnInit, OnDestroy {
  startDateConfig = { ...Constants.DATE_CONFIG, min: null, max: moment().format(Constants.DISPLAY_DATE_FILTER_FORMAT),
    format: Constants.DISPLAY_DATE_FILTER_FORMAT };
  endDateConfig = { ...Constants.DATE_CONFIG, min: null, max: moment().format(Constants.DISPLAY_DATE_FILTER_FORMAT),
    format: Constants.DISPLAY_DATE_FILTER_FORMAT };
  dateFrom: FormControl = new FormControl(null, [Validators.required]);
  dateTo: FormControl = new FormControl(null, [Validators.required]);
  destroyed$ = new Subject();
  @Output() dateFilterEvent = new EventEmitter();
  @ViewChild('startDate', { static: false }) startDate: DatePickerComponent;
  @ViewChild('endDate', { static: false }) endDate: DatePickerComponent;
  @Input() showClearAll; // clear all button in report section
  constructor(private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.dateFrom.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(date => {
      this.endDateConfig = { ...this.endDateConfig, min: date };
      this.dateTo.setValue(null);
    });
  }

  endDateChanged(date) {
    if (this.dateTo.value && this.dateFrom.value && this.showClearAll) {
      this.dateFilterEvent.emit(
        this.getDateFromDateTo()
      );
      // emit event or change params
    }
  }

  clearDate() {
    this.clearDateWithoutEmit();
    if (this.showClearAll) {
      this.dateFilterEvent.emit(
        {}
      );
    }
  }

  clearDateWithoutEmit() {
    this.dateTo.setValue(null);
    this.dateFrom.setValue(null);
  }

  changeQueryParams(params) {
    changeQueryParams(params, this.route, this.router);
  }

  get isDateValid() {
    return (!this.dateFrom.valid && !this.dateTo.valid) || (this.dateFrom.valid && this.dateTo.valid);
  }

  getDateFromDateTo() {
    return {
      dateTo: this.dateTo.value,
      dateFrom: this.dateFrom.value
    };
  }

  openDatePicker(selectedDate) {
    this[selectedDate].api.open();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
