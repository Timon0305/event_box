import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { QuotesSectionService } from '../../services/quotes-section.service';
import { ActivatedRoute, Router } from '@angular/router';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-planner-expired-quotes-list',
  templateUrl: './planner-expired-quotes-list.component.html',
  providers: [QuotesSectionService]
})
export class PlannerExpiredQuotesListComponent implements OnInit, OnDestroy {
  expiredQuotesListData$;
  readonly destroyed$ = new Subject();
  quoteRequestFolderData$;
  defaultSortingParams = Constants.DEFAULT_SORTING_PARAMS.REJECTED_CANCELED_EXPIRED_REJECTED;
  paramsLength;
  constructor(
    private readonly quoteSectionService: QuotesSectionService,
    private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    const type = this.getType();
    this.route.queryParams.
      pipe(takeUntil(this.destroyed$)).subscribe(params => {
        if (!Object.keys(params).length) {
          this.updateQueryParams({ order: -1, sort: 'quoteExpirationDate' });
          return;
        }
        this.getQuotesList({ ...this.defaultSortingParams, ...params, type });
        this.paramsLength = Object.keys(params).length;
      });
  }

  getQuotesList(options = {}) {
    const type = this.getType();
    this.expiredQuotesListData$ = this.quoteSectionService.getQuoteList({ ...options, type });
  }

  updateQueryParams(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  fetchList(params) {
    return params ? (params.getData ? this.getQuotesList(this.route.snapshot.queryParams)
      : this.updateQueryParams(params)) : this.getQuotesList(this.route.snapshot.queryParams);
  }

  getType() {
    let type = Constants.QUOTE_STATUS.EXPIRED_QUOTES;
    if (this.router.url.includes('rejected-quotes')) {
      type = Constants.QUOTE_STATUS.REJECTED_QUOTES;
    }
    return type;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


}
