import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/config/constant';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { QuotesService } from '../../services/quotes.service';
import { CheckRoles } from '@app/core/utils/common.util';

@Component({
  selector: 'app-expired-cancelled-listing',
  templateUrl: './expired-cancelled-listing.component.html',
  providers: [QuotesService]
})
export class ExpiredCancelledListingComponent implements OnInit, OnDestroy {
  paramsLength;
  public expiredQuotes = true;
  expiredQuotes$;
  cancelledQuotes$;
  sortingDefaultParams = Constants.DEFAULT_SORTING_PARAMS.REJECTED_CANCELED_EXPIRED_REJECTED;
  readonly destroyed$ = new Subject();
  isAdmin = false;
  @Input() expiredCancelIndex;
  sortingParams;
  companyId;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly quotesService: QuotesService,
    private readonly checkRoles: CheckRoles,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.isAdmin = this.checkRoles.isAdmin();
    this.manageListingProcess();
  }

  manageListingProcess() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.expiredQuotes = params.type === Constants.QUOTE_STATUS.EXPIRED_QUOTES;
      const type = this.expiredQuotes ? Constants.QUOTE_STATUS.EXPIRED_QUOTES : Constants.QUOTE_STATUS.CANCELED_QUOTES;
      if (this.isAdmin) {
        this.getExpiredCancelledQuotesAdmin({ ...params, type, ...this.sortingDefaultParams });
      } else {
        this.getExpiredCancelledQuotes({ ...this.sortingDefaultParams, ...params, type });
      }
      this.paramsLength = Object.keys(params).length;
    });
  }

  getExpiredCancelledQuotes(options = {}) {
    if (this.expiredQuotes) {
      this.cancelledQuotes$ = null;
      this.expiredQuotes$ = this.quotesService.getQuotesList(options);
    } else {
      this.expiredQuotes$ = null;
      this.cancelledQuotes$ = this.quotesService.getQuotesList(options);
    }
  }

  getExpiredCancelledQuotesAdmin(options = {}) {
    if (this.expiredQuotes) {
      this.cancelledQuotes$ = null;
      this.expiredQuotes$ = this.quotesService.getAdminQuotesList(options);
    } else {
      this.expiredQuotes$ = null;
      this.cancelledQuotes$ = this.quotesService.getAdminQuotesList(options);
    }
  }



  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
