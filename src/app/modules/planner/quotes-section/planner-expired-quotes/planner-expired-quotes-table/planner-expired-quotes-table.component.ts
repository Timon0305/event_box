import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { trackByObjectId, CheckRoles, isEventDetailPage, compareMomentIsAfter } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { Messages } from '@app/config/messages';
import { QuotesSectionService } from '../../services/quotes-section.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewQuoteRequestComponent } from '@app/shared/view-quote-request/view-quote-request/view-quote-request.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import * as moment from 'moment';
import { ViewNoteComponent } from '@app/modules/planner/quote-request-folder/view-notes/view-note/view-note.component';

@Component({
  selector: 'app-planner-expired-quotes-table',
  templateUrl: './planner-expired-quotes-table.component.html',
  styleUrls: ['./planner-expired-quotes-table.component.scss'],
  providers: [QuotesSectionService]
})
export class PlannerExpiredQuotesTableComponent implements OnInit, OnDestroy {
  showFilters = true;
  expiredQuotesListData;
  radioTypeValue;
  quoteStatus = Messages.VENDOR_QUOTE_STATUS;
  @ViewChild(SharedDateRangeComponent, {static: false}) dateRangeComponent: SharedDateRangeComponent;
  @Input() set setexpiredQuotesListData(value) {
    if (value) {
      this.expiredQuotesListData = value;
      this.showFilters = value.totalDocs > 0 || this.paramsLength > 0;
    }
  }
  @Input() paramsLength;
  trackByFn = trackByObjectId;
  @Output() fetchList = new EventEmitter();
  sortByData = Constants.EXPIRED_QUOTES_LIST_FILTER;
  readonly destroyed$ = new Subject();
  radioData = Constants.PLANNER_EXPIRED_QUOTE_LIST_RADIO;
  isAdmin = false;
  eventDetailPage;
  isRejectedQuotes;
  plannerId; // In case admin view planner details
  eventId;
  plannerQuoteStatus = Constants.QUOTE_STATUS;

  constructor(
    private readonly quotesSectionService: QuotesSectionService,
    private readonly flash: AlertService, private readonly checkRoles: CheckRoles,
    private readonly modalService: NgbModal,
    private readonly route: ActivatedRoute, private readonly router: Router
  ) { }

  ngOnInit() {
    this.eventId = this.quotesSectionService.geteventViewId(this.route.snapshot);
    this.plannerId = this.quotesSectionService.getPlannerId(this.route.snapshot);
    this.isRejectedQuotes = this.router.url.includes('rejected-quotes');
    this.eventDetailPage = isEventDetailPage(this.router);
    this.isAdmin = this.checkRoles.isAdmin();
    if (this.isAdmin) {
      this.sortByData = Constants.ADMIN_EXPIRED_QUOTES_LIST_FILTER;
    }
    this.radioTypeValue = this.route.snapshot.queryParams.eventDate || Constants.ALL_RADIO_OPTION;
  }
  pageChange(page) {
    this.fetchList.emit({ page });
  }

  sortFilterChange(filter) {
    this.fetchList.emit(filter);
  }

  radioButtonChange(event) {
    this.fetchList.emit({ eventDate: event !== Constants.ALL_RADIO_OPTION ? event : null, page: 1 });
  }
  requestQuoteAgain(item) {
    const payload = {
      ids: [item._id],
      status: Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES
    };
    this.quotesSectionService.updateQuoteStatus(payload).pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.flash.showSuccess(Messages.SUCCESS.requestsend);
      this.fetchList.emit(false);
    }, error => {
      this.flash.showError(Messages.ERROR.acceptQuote);
    });
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
      plannerId: this.plannerId, type: Constants.QUOTE_STATUS.EXPIRED_QUOTES,
      isAdmin: this.isAdmin, dateRangeComponent: this.dateRangeComponent
    }).pipe(takeUntil(this.destroyed$)).subscribe();
  }

  isEventExpired(eventEndDate) {
    return compareMomentIsAfter(moment(), eventEndDate, 'minute');
  }

  viewNotes(notes) {
   const modalRef =  this.modalService.open(ViewNoteComponent, { centered: true });
   modalRef.componentInstance.onlyViewNotes = true;
   modalRef.componentInstance.notes = notes;
  }

}
