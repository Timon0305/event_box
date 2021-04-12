import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { getFilterDateRange } from '@app/core/utils/common.util';

@Component({
  selector: 'app-shared-date-filter',
  templateUrl: './shared-date-filter.component.html'
})
export class SharedDateFilterComponent implements OnInit {
  sortByData = Constants.DATE_FILTER_OPTIONS;
  @Output() filterDateEvent = new EventEmitter();
  @Input() fromPartnerReport;
  selectedValue: FormControl = new FormControl(Constants.API_DATE_FILTER_TYPE.month);
  constructor() { }

  ngOnInit() {
    if (this.fromPartnerReport) {
      this.sortByData = Constants.PARTNER_REPORT_FILTER;
    }
  }

  dateChange(dateType) {
    const dateRange = getFilterDateRange(dateType);
    const params = { ...dateRange, dateType };
    this.filterDateEvent.emit(params);
  }
}
