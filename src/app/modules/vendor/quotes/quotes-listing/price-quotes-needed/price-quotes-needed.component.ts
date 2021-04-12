import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { Router, ActivatedRoute } from '@angular/router';
import { changeQueryParams, CheckRoles } from '@app/core/utils/common.util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestQuoteComponent } from '@app/shared/request-quote/request-quote/request-quote.component';
import { CommonService } from '@app/core/services/common/common.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
// tslint:disable-next-line:max-line-length
import { SharedCancelRejectPopupComponent } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup/shared-cancel-reject-popup.component';
import { QuotesService } from '../../services/quotes.service';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-price-quotes-needed',
  templateUrl: './price-quotes-needed.component.html',
  styleUrls: ['./price-quotes-needed.component.scss'],
  providers: [QuotesService]
})
export class PriceQuotesNeededComponent implements OnInit, OnDestroy {
  @Input() priceQuotesNeeded;
  @Input() paramsLength;
  @Output() updatePage = new EventEmitter();
  @Output() quoteSend = new EventEmitter();
  sortByData = Constants.QUOTES_LIST_FILTER;
  constant = Constants;
  isAdmin;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  destroyed$ = new Subject();
  constructor(
    private readonly router: Router, private readonly quotesService: QuotesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: NgbModal,
    private readonly commonService: CommonService,
    private readonly checkRole: CheckRoles
  ) { }

  ngOnInit() {
    this.isAdmin = this.checkRole.isAdmin();
    this.commonService.getHeaderCountApi().pipe(takeUntil(this.destroyed$)).subscribe();
    /**
     * Commented for now to test scenerio
     */
    // this.sessionService.setProfileEvent(true);
  }


  initiateQuoteRequest(data) {
    const modalRef = this.modalService.open(RequestQuoteComponent,
      { backdrop: 'static', keyboard: false, windowClass: 'modal-extra-large' });
    if (data.latestReply) {
      data.lastReplyDate = data.latestReply.updatedAt;
      if (!data.wantCuonterOffer) {
        delete data.latestReply;
      }
    }
    modalRef.componentInstance.quote = data;
    modalRef.result.then(res => {
      this.quoteSend.emit(true);
      this.commonService.getHeaderCountApi().pipe(take(1)).subscribe();
    }).catch(error => error);
  }

  pageChange(page) {
    this.updatePage.emit({ page });
  }

  updateQueryParameters(params = {}) {
    changeQueryParams({ ...params }, this.activatedRoute, this.router);
    this.paramsLength = Object.keys(params).length;
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

  cancelQuote(quoteId) {
    const modalRef = this.modalService.open(SharedCancelRejectPopupComponent, { centered: true });
    this.quotesService.vendorCancelQuote(modalRef, quoteId, Constants.QUOTE_STATUS.REJECTED_BY_VENDOR).then(payload => {
      return this.quotesService.updateQuoteStatus(payload).pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
          this.commonService.getHeaderCountApi().pipe(takeUntil(this.destroyed$)).subscribe();
          this.router.navigate(['/vendor/quotes/expired-cancelled-list'], { queryParams: { type: 'EXPIRED_QUOTES' } });
        });
    }).catch(res => res);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
