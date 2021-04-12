import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { trackByObjectId, CheckRoles, isEventDetailPage } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { MessageApiService } from '@app/modules/message/service/message-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { QuotesSectionService } from '../../services/quotes-section.service';

@Component({
  selector: 'app-awaiting-vendor-quotes-table',
  templateUrl: './awaiting-vendor-quotes-table.component.html',
  styleUrls: ['./awaiting-vendor-quotes-table.component.scss'],
  providers: [MessageApiService, QuotesSectionService]
})
export class AwaitingVendorQuotesTableComponent implements OnInit, OnDestroy {
  showFilters = true;
  readonly destroyed$ = new Subject();
  eventDetailPage;
  awaitingVendorQuotesListData;
  isAdmin;
  eventViewId;
  @Input() set setAwaitingVendorQuotesListData(value) {
    if (value) {
      this.awaitingVendorQuotesListData = value;
      this.showFilters = value.totalDocs > 0 || this.paramsLength > 0;
    }
  }
  @Input() paramsLength;
  trackByFn = trackByObjectId;
  @Output() fetchList = new EventEmitter();
  sortByData = Constants.QUOTE_REQ_FOLDER_LIST_FILTER;
  plannerId;
  @ViewChild(SharedDateRangeComponent, {static: false}) dateRangeComponent: SharedDateRangeComponent;
  constructor(
    private readonly checkRole: CheckRoles, private readonly route: ActivatedRoute,
    private readonly messageApiService: MessageApiService,
    private readonly quotesSectionService: QuotesSectionService, private readonly router: Router) { }

  ngOnInit() {
    this.eventViewId = this.quotesSectionService.geteventViewId(this.route.snapshot);
    this.plannerId = this.quotesSectionService.getPlannerId(this.route.snapshot);
    this.eventDetailPage = isEventDetailPage(this.router);
    this.isAdmin = this.checkRole.isAdmin();
    if (this.isAdmin) {
      this.sortByData = Constants.ADMIN_QUOTE_REQ_FOLDER_LIST_FILTER;
    }
  }
  pageChange(page) {
    this.fetchList.emit({ page });
  }

  sortFilterChange(filter) {
    this.fetchList.emit(filter);
  }

  search(filter) {
    this.fetchList.emit({ filter: filter || null, page: 1 });
  }

  sendMessage(quoteId) {
    const payload = {
      type: Constants.MESSAGE_TYPE.QUOTE,
      quote: quoteId,
    };
    this.messageApiService.sendMessageAndNavigate(payload).
      pipe(takeUntil(this.destroyed$)).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  fetchReport() {
    this.quotesSectionService.getReportData({
      plannerId: this.plannerId, type: Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES,
      isAdmin: this.isAdmin, dateRangeComponent: this.dateRangeComponent
    }).pipe(takeUntil(this.destroyed$)).subscribe();
  }

}
