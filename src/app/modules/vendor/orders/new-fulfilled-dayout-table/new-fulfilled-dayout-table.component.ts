import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { changeQueryParams, trackByObjectId, CheckRoles } from '@app/core/utils/common.util';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/config/constant';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { MessageApiService } from '@app/modules/message/service/message-api.service';
import { ExportService } from '@app/core/services/common/export.service';

@Component({
  selector: 'app-new-fulfilled-dayout-table',
  templateUrl: './new-fulfilled-dayout-table.component.html',
  styleUrls: ['./new-fulfilled-dayout-table.component.scss'],
  providers: [MessageApiService]
})
export class NewFulfilledDayoutTableComponent implements OnInit, OnDestroy {
  @Input() orderList;
  @Input() paramsLength = 0;
  @Input() type;
  @Input() sortByData;
  @Input() dayOutPayload;
  constant = Constants;
  trackByFn = trackByObjectId;
  readonly destroyed$ = new Subject();
  isAdmin: boolean;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  timezoneMap = Constants.TIME_ZONE_DISPLAY_MAP;
  constructor(
    private readonly activatedRoute: ActivatedRoute, private readonly exportService: ExportService,
    private readonly router: Router, private readonly checkRole: CheckRoles,
    private readonly messageApiService: MessageApiService
  ) { }

  ngOnInit() {
    this.isAdmin = this.checkRole.isAdmin();
  }

  updateQueryParameters(params = {}) {
    changeQueryParams({ ...params }, this.activatedRoute, this.router);
    this.paramsLength = Object.keys(params).length;
  }

  navigateToOrderView(order) {
    const cmpId = this.activatedRoute.snapshot.params.companyId;
    this.router.navigate(
      [
        `${Constants.APPLICATION_ROUTES.admin.vendorManagement}/${this.activatedRoute.snapshot.params.id}/order-view/${cmpId}/${order._id}`
      ]
    );

  }

  messagePlanner(order, plannerId) {
    const payload = {
      type: Constants.MESSAGE_TYPE.ORDER,
      order,
      planner: plannerId
    };
    this.messageApiService.sendMessageAndNavigate(payload, true)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }




  search(filter) {
    let searchPayload: { [index: string]: string | null } = {
      filter: null,
      fields: null
    };
    if (filter) {
      searchPayload = { ...searchPayload, filter };
    }
    this.updateQueryParameters({ ...searchPayload, page: 1 });
  }

  sortFilterChange(filter) {
    this.updateQueryParameters(filter);
  }

  fetchUpdatedList(params = {}) {
    changeQueryParams({ ...params }, this.activatedRoute, this.router);

  }

  pageChange(page) {
    this.fetchUpdatedList({ page });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  fetchReport() {
    const { from, dateType, to = null } = this.dayOutPayload;
    let options;
    if (this.isAdmin) {
      options = {
        role: Constants.Role.VENDOR,
        id: this.activatedRoute.snapshot.params.companyId
      };
    }
    options = {
      ...options,
      exportType: Constants.EXPORTS_DATA.orders.exportType,
      from,
      dateType,
      to,
    };
    this.exportService.export({
      ...options
    }).pipe(takeUntil(this.destroyed$)).subscribe();
  }

}
