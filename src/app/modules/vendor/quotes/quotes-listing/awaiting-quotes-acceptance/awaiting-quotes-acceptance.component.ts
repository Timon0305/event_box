import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { changeQueryParams } from '@app/core/utils/common.util';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line: max-line-length
import { SharedCancelRejectPopupComponent } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup/shared-cancel-reject-popup.component';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { QuotesService } from '../../services/quotes.service';
import { Subject } from 'rxjs/internal/Subject';
import { RequestQuoteComponent } from '@app/shared/request-quote/request-quote/request-quote.component';
import { Messages } from '@app/config/messages';
import { AdminViewQuoteComponent } from '@app/modules/admin/vendor-management/admin-view-quote/admin-view-quote/admin-view-quote.component';
import { ViewQuoteRequestComponent } from '@app/shared/view-quote-request/view-quote-request/view-quote-request.component';
import { take } from 'rxjs/internal/operators/take';
import { CommonService } from '@app/core/services/common/common.service';

@Component({
  selector: 'app-awaiting-quotes-acceptance',
  templateUrl: './awaiting-quotes-acceptance.component.html',
  styleUrls: ['./awaiting-quotes-acceptance.component.scss'],
  providers: [QuotesService]
})
export class AwaitingQuotesAcceptanceComponent implements OnInit, OnDestroy {
  @Input() awaitingQuotes;
  @Input() isAdmin: boolean;
  @Input() paramsLength;
  constant = Constants;
  quoteStatus = Messages.VENDOR_QUOTE_STATUS;
  readonly destroyed$ = new Subject();
  @Output() updatePage = new EventEmitter();
  @Output() quoteUpdated = new EventEmitter();
  sortByData = Constants.AWAITING_QUOTES_LIST_FILTER;

  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  constructor(
    private readonly commonService: CommonService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: NgbModal,
    private readonly quotesService: QuotesService) { }

  ngOnInit() {
  }

  updateQueryParameters(params = {}) {
    changeQueryParams({ ...params }, this.activatedRoute, this.router);
    this.paramsLength = Object.keys(params).length;
  }

  viewQuoteFromAdmin(order) {
    const modalRef = this.modalService.open(AdminViewQuoteComponent, { windowClass: Constants.MODAL_EXTRA_LG });
    modalRef.componentInstance.order = order;
  }


  getQuoteView(quote) {
    const cmpId = this.activatedRoute.snapshot.params.companyId;
    this.router.navigate(
      [
        `${Constants.APPLICATION_ROUTES.admin.vendorManagement}/${this.activatedRoute.snapshot.params.id}/quote-view/${cmpId}/${quote._id}`
      ]
    );

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

  cancelQuote(quoteId) {
    const modalRef = this.modalService.open(SharedCancelRejectPopupComponent, { centered: true });
    this.quotesService.vendorCancelQuote(modalRef, quoteId, Constants.QUOTE_STATUS.CANCELED_QUOTES).then(payload => {
      return this.quotesService.updateQuoteStatus(payload).pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
          this.commonService.getHeaderCountApi().pipe(take(1)).subscribe();
          this.router.navigate(['/vendor/quotes/expired-cancelled-list'], { queryParams: { type: 'CANCELLED_QUOTES' } });
        });
    }).catch(res => res);
  }

  sortFilterChange(filter) {
    this.updateQueryParameters(filter);
  }

  pageChange(page) {
    this.updatePage.emit({ page });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  updateQuoteRequest(quote) {
    const modalRef = this.modalService.open(RequestQuoteComponent,
      { backdrop: 'static', keyboard: false, windowClass: Constants.MODAL_EXTRA_LG });
    modalRef.componentInstance.quote = quote;
    modalRef.result.then(res => {
      this.quoteUpdated.emit(true);

    }).catch(error => error);
  }

  viewQuote(item) {
    const modalRef = this.modalService.open(ViewQuoteRequestComponent, { windowClass: Constants.MODAL_EXTRA_LG });
    modalRef.componentInstance.quote = item;
  }


}
