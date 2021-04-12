import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesSectionService } from '../../services/quotes-section.service';
import { Subject } from 'rxjs/internal/Subject';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-quote-pending-payment-list',
  templateUrl: './quote-pending-payment-list.component.html',
  providers: [QuotesSectionService]
})
export class QuotePendingPaymentListComponent implements OnInit, OnDestroy {

  pendingQuotesListData$;
  readonly destroyed$ = new Subject();
  quoteRequestFolderData$;
  paramsLength;
  defaultSortingParams = Constants.DEFAULT_SORTING_PARAMS.ACCEPTED_QUOTES;

  constructor(
    private readonly quoteSectionService: QuotesSectionService,
    private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.route.queryParams.
      pipe(takeUntil(this.destroyed$)).subscribe(params => {
        if (!Object.keys(params).length) {
          this.updateQueryParams({ order: 1, sort: 'events.startdate' });
          return;
        }
        this.getQuotesList({ ...this.defaultSortingParams, ...params, type: Constants.QUOTE_STATUS.ACCEPTED_QUOTES });
        this.paramsLength = Object.keys(params).length;
      });
  }

  getQuotesList(options = {}) {
    this.pendingQuotesListData$ = this.quoteSectionService.getQuoteList(options);
  }

  updateQueryParams(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  fetchList(params) {
    return params ? (params.getData ? this.getQuotesList(this.route.snapshot.queryParams)
      : this.updateQueryParams(params)) : this.getQuotesList({ ...params, type: Constants.QUOTE_STATUS.ACCEPTED_QUOTES });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


}
