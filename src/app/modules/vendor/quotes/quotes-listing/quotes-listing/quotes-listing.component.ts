import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesService } from '../../services/quotes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/config/constant';
import { changeQueryParams } from '@app/core/utils/common.util';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-quotes-listing',
  templateUrl: './quotes-listing.component.html',
  styleUrls: ['./quotes-listing.component.scss'],
  providers: [QuotesService]
})

export class QuotesListingComponent implements OnInit, OnDestroy {
  awaitingQuotesObservable$;
  priceQuotesNeededObservable$;
  priceQuotesNeeded = true;
  constant = Constants;
  queryStrParams = { type: Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES };
  defaultSortingParams = Constants.DEFAULT_SORTING_PARAMS.ACCEPT_REJECT_AND_AWAITING_VENDOR_QUOTES;
  readonly destroyed$ = new Subject();
  paramsLength = 0;

  constructor(
    private readonly quotesService: QuotesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.getPaginatedData();
    this.getQuotesData();
  }

  getQuotesData(parameters?) {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      const sortingParams = { ...params };
      this.paramsLength = Object.keys(params).length;
      if (sortingParams && sortingParams.type) {
        delete sortingParams.type;
      }
      if (this.route.snapshot.queryParams.type === Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES) {
        this.priceQuotesNeeded = false;
        this.getAwaitingQuotes({ ...this.defaultSortingParams, ...sortingParams, ...this.queryStrParams });
      } else {
        this.priceQuotesNeeded = true;
        this.getPriceQuotesNeeded({ ...this.defaultSortingParams, ...sortingParams });
      }
    });
  }

  getPaginatedData() {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      if (params.page) {
        this.getQuotesData(params);
      } else {
        this.getQuotesData();
      }

    });
  }
  getUpdatedList(event) {
    if (event) {
      this.getQuotesData();
    }
  }


  getPriceQuotesNeeded(options?) {
    this.priceQuotesNeededObservable$ = this.quotesService.getQuotesList(options);
  }

  getAwaitingQuotes(options?) {
    this.priceQuotesNeededObservable$ = null;
    this.awaitingQuotesObservable$ = this.quotesService.getQuotesList(options);
  }


  navigateToUpcoming(type?) {
    if (type === Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES) {
      this.priceQuotesNeeded = false;
      this.getAwaitingQuotes(this.queryStrParams);
      this.router.navigate(['/vendor/quotes/list'], {
        queryParams:
          {  ...this.defaultSortingParams, type: Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES }
      });
    } else {
      this.priceQuotesNeeded = true;
      this.router.navigate(['/vendor/quotes/list'], {
        queryParams:
          { ...this.defaultSortingParams }
      });
    }
  }

  fetchUpdatedList(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
