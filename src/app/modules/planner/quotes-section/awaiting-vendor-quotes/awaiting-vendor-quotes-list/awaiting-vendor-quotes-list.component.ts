import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesSectionService } from '../../services/quotes-section.service';
import { Subject } from 'rxjs/internal/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Constants } from '@app/config/constant';
import { changeQueryParams } from '@app/core/utils/common.util';

@Component({
  selector: 'app-awaiting-vendor-quotes-list',
  templateUrl: './awaiting-vendor-quotes-list.component.html',
  providers: [QuotesSectionService]
})
export class AwaitingVendorQuotesListComponent implements OnInit, OnDestroy {
  awaitingVendorQuotesListData$;
  readonly destroyed$ = new Subject();
  quoteRequestFolderData$;
  defaultSortingParams = Constants.DEFAULT_SORTING_PARAMS.ACCEPT_REJECT_AND_AWAITING_VENDOR_QUOTES;
  paramsLength;
  constructor(
    private readonly quoteSectionService: QuotesSectionService,
    private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.route.queryParams.
      pipe(takeUntil(this.destroyed$)).subscribe(params => {
        if (!Object.keys(params).length) {
          this.updateQueryParams({ order: 1, sort: 'quoteExpirationDate' });
          return;
        }
        this.getQuotesList({ ...this.defaultSortingParams, ...params, type: Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES });
        this.paramsLength = Object.keys(params).length;
      });
  }

  getQuotesList(options = {}) {
    this.awaitingVendorQuotesListData$ = this.quoteSectionService.getQuoteList(options);
  }

  updateQueryParams(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  fetchList(params) {
    return params.getData ? this.getQuotesList(this.route.snapshot.queryParams)
      : this.updateQueryParams(params);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
