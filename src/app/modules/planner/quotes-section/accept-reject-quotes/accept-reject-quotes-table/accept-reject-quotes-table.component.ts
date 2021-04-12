import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ViewChild } from '@angular/core';
import { trackByObjectId, CheckRoles, isEventDetailPage } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { QuotesSectionService } from '../../services/quotes-section.service';
import { Subject } from 'rxjs/internal/Subject';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line: max-line-length
import { SharedCancelRejectPopupComponent } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup/shared-cancel-reject-popup.component';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ViewQuoteRequestComponent } from '@app/shared/view-quote-request/view-quote-request/view-quote-request.component';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { CommonService } from '@app/core/services/common/common.service';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-accept-reject-quotes-table',
  templateUrl: './accept-reject-quotes-table.component.html',
  styleUrls: ['./accept-reject-quotes-table.component.scss'],
  providers: [QuotesSectionService]
})
export class AcceptRejectQuotesTableComponent implements OnInit, OnDestroy {
  showFilters = true;
  acceptRejectQuotesListData;
  readonly destroyed$ = new Subject();
  @Input() set setAcceptRejectQuotesListData(value) {
    if (value) {
      this.acceptRejectQuotesListData = value;
      this.showFilters = value.totalDocs > 0 || this.paramsLength > 0;
    }
  }
  @Input() paramsLength;
  trackByFn = trackByObjectId;
  @Output() fetchList = new EventEmitter();
  sortByData = Constants.ACCEPT_REJECT_QUOTE_LIST_FILTER;
  isAdmin = false;
  eventDetailPage;
  plannerId; // In case of admin viewing planner details
  eventId;
  @ViewChild(SharedDateRangeComponent, { static: false }) dateRangeComponent: SharedDateRangeComponent;
  constructor(
    private readonly commonService: CommonService,
    private readonly quotesSectionService: QuotesSectionService, private readonly checkRole: CheckRoles,
    private readonly flash: AlertService, private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: NgbModal) { }

  ngOnInit() {
    this.commonService.getHeaderCountApi().pipe(take(1)).subscribe();
    this.eventId = this.quotesSectionService.geteventViewId(this.route.snapshot);
    this.plannerId = this.quotesSectionService.getPlannerId(this.route.snapshot);
    this.eventDetailPage = isEventDetailPage(this.router);
    this.isAdmin = this.checkRole.isAdmin();
    if (this.isAdmin) {
      this.sortByData = Constants.ADMIN_ACCEPT_REJECT_QUOTE_LIST_FILTER;
    }
  }
  pageChange(page) {
    this.fetchList.emit({ page });
  }

  acceptQuote(item) {
    const payload = {
      ids: [item._id],
      status: Constants.QUOTE_STATUS.ACCEPTED_QUOTES
    };
    this.quotesSectionService.updateQuoteStatus(payload).pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.flash.showSuccess(Messages.SUCCESS.quoteAccepted);
      // refresh count after planner accept quote
      this.commonService.getHeaderCountApi().pipe(take(1)).subscribe();
      this.router.navigate(['/planner/quotes/quote-pending-payment/list'],
        { queryParams: Constants.QUOTE_SECTION_QUERY_PARAMS.quotePendingPayment });
    }, error => {
    });
  }

  rejectQuote(item) {
    const modalRef = this.modalService.open(SharedCancelRejectPopupComponent, { centered: true });
    const data = { title: Constants.CANCEL_REJECT_TITLE_KEY.REJECTED_QUOTES };
    modalRef.componentInstance.quoteDetail = { ...data, ...item };
    modalRef.result.then(res => {
      const payload = {
        ids: [item._id],
        status: Constants.QUOTE_STATUS.REJECTED_QUOTES,
        plannerNotes: res.value.notes,
        wantCuonterOffer: res.value.wantCuonterOffer
      };
      this.quotesSectionService.updateQuoteStatus(payload).pipe(takeUntil(this.destroyed$)).subscribe(() => {
        if (this.acceptRejectQuotesListData.docs.length === 1) {
          this.router.navigate(['/planner/quotes/awaiting-vendor-quotes/list']);
        } else {
          this.fetchList.emit();
        }
        // refresh count after planner reject quote
        this.commonService.getHeaderCountApi().pipe(take(1)).subscribe();
      }, error => {
      });

    });
  }

  sortFilterChange(filter) {
    this.fetchList.emit(filter);
  }

  search(filter) {
    this.fetchList.emit({ filter: filter || null, page: 1 });
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  viewQuote(quote) {
    const modalRef = this.modalService.open(ViewQuoteRequestComponent, { windowClass: 'modal-extra-large' });
    modalRef.componentInstance.quote = quote;
  }

  fetchReport() {
    this.quotesSectionService.getReportData({
      plannerId: this.plannerId, type: Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES,
      isAdmin: this.isAdmin, dateRangeComponent: this.dateRangeComponent
    }).pipe(takeUntil(this.destroyed$)).subscribe();
  }
}


