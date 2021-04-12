import { Component, OnInit, OnDestroy } from '@angular/core';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { QuotesSectionService } from '../../services/quotes-section.service';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-accept-reject-quotes-list',
  templateUrl: './accept-reject-quotes-list.component.html',
  providers: [QuotesSectionService]
})
export class AcceptRejectQuotesListComponent implements OnInit, OnDestroy {
  acceptRejectQuotes$;
  readonly destroyed$ = new Subject();
  quoteRequestFolderData$;
  defaultSortingParams = Constants.DEFAULT_SORTING_PARAMS.ACCEPT_REJECT_AND_AWAITING_VENDOR_QUOTES;
  paramsLength;
  constructor(
    private readonly quoteSectionService: QuotesSectionService,
    private readonly sessionService: SessionManagerService,
    private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.route.queryParams.
      pipe(takeUntil(this.destroyed$)).subscribe(params => {
        if (!Object.keys(params).length) {
          this.updateQueryParams({ order: 1, sort: 'quoteExpirationDate' });
          return;
        }
        this.getQuotesList({ ...params, type: Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES });
        this.sessionService.setProfileEvent(true);
        this.paramsLength = Object.keys(params).length;
      });
  }

  getQuotesList(options = {}) {
    this.acceptRejectQuotes$ = this.quoteSectionService.getQuoteList(options);
  }

  updateQueryParams(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  fetchList(params) {
    return params ? (params.getData ? this.getQuotesList(this.route.snapshot.queryParams)
      : this.updateQueryParams(params)) : this.getQuotesList({ ...params, type: Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
