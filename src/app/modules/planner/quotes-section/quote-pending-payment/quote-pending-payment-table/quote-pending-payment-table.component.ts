import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { trackByObjectId, CheckRoles, isEventDetailPage } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { QuotesSectionService } from '../../services/quotes-section.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { MessageApiService } from '@app/modules/message/service/message-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewQuoteRequestComponent } from '@app/shared/view-quote-request/view-quote-request/view-quote-request.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { CommonService } from '@app/core/services/common/common.service';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-quote-pending-payment-table',
  templateUrl: './quote-pending-payment-table.component.html',
  styleUrls: ['./quote-pending-payment-table.component.scss'],
  providers: [QuotesSectionService, MessageApiService]
})
export class QuotePendingPaymentTableComponent implements OnInit, OnDestroy {
  showFilters = true;
  pendingQuotesListData;
  readonly destroyed$ = new Subject();
  plannerRoutes = Constants.APPLICATION_ROUTES.planner;
  eventDetailPage;
  @Input() set setPendingQuotesListData(value) {
    if (value) {
      this.pendingQuotesListData = value;
      this.showFilters = value.totalDocs > 0 || this.paramsLength > 0;
    }
  }
  @Input() paramsLength;
  trackByFn = trackByObjectId;
  @Output() fetchList = new EventEmitter();
  sortByData = Constants.QUOTES_PENDING_PAYMENT;
  isAdmin = false;
  @ViewChild(SharedDateRangeComponent, {static: false}) dateRangeComponent: SharedDateRangeComponent;
  plannerId; // In case of admin viewing planner details
  eventId; // event details
  constructor(
    private readonly commonService: CommonService,
    private readonly router: Router, private readonly route: ActivatedRoute,
    private readonly modalService: NgbModal, private readonly checkRole: CheckRoles,
    private readonly quotesSectionService: QuotesSectionService, private readonly messageApiService: MessageApiService) { }

  ngOnInit() {
    this.plannerId = this.quotesSectionService.getPlannerId(this.route.snapshot);
    this.eventId = this.quotesSectionService.geteventViewId(this.route.snapshot);
    this.eventDetailPage = isEventDetailPage(this.router);
    this.isAdmin = this.checkRole.isAdmin();
    if (this.isAdmin) {
      this.sortByData = Constants.ADMIN_QUOTES_PENDING_PAYMENT;
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

  async deleteQuote(quote, index) {
    const deleteConfirmation = await this.quotesSectionService.openConfirmationPopup(Constants.DELETE_QUOTE);
    if (deleteConfirmation) {
      const payload = { ids: [quote._id] };
      this.quotesSectionService.deleteQuote(payload)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.commonService.getHeaderCountApi().pipe(take(1)).subscribe();
          this.fetchList.emit();
        });
    }
    return;
  }
  viewQuote(quote) {
    const modalRef = this.modalService.open(ViewQuoteRequestComponent, { windowClass: 'modal-extra-large' });
    modalRef.componentInstance.quote = quote;
  }

  messageVendor(quoteId) {
    const payload = {
      type: Constants.MESSAGE_TYPE.QUOTE,
      quote: quoteId
    };
    this.messageApiService.sendMessageAndNavigate(payload)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }

  fetchReport() {
    this.quotesSectionService.getReportData({plannerId: this.plannerId, type: Constants.QUOTE_STATUS.PENDING_PAYMENT_QUOTES,
    isAdmin: this.isAdmin, dateRangeComponent: this.dateRangeComponent
    }).pipe(takeUntil(this.destroyed$)).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
