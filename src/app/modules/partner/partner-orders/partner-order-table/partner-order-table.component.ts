import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { changeQueryParams, trackByObjectId } from '@app/core/utils/common.util';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-partner-order-table',
  templateUrl: './partner-order-table.component.html',
  styleUrls: ['./partner-order-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PartnerOrderTableComponent implements OnInit {
  sortFilterItems = Constants.PARTNER_VENDOR_ORDERS_SORT;
  @Input() loader;
  @Input() isFilter;
  @Input() partnerOrderList;
  trackByFn = trackByObjectId;
  tabType;
  partnerOrderTypes = Constants.PARTNER_ORDER_TYPES;
  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.tabType = this.activatedRoute.snapshot.queryParams.type;
    if (this.tabType === this.partnerOrderTypes.plannerOrders) {
      this.sortFilterItems = Constants.PARTNER_PLANNER_ORDERS_SORT;
    }

  }

  sortFilterChange(sort) {
    this.changeQueryParams(sort);
  }

  changeQueryParams(params) {
    let param;
    param = Object.assign({}, params);
    param.page = params;
    changeQueryParams(param, this.activatedRoute, this.router);
  }

  search(keyword) {
    this.changeQueryParams({ filter: keyword || null });
  }

}
