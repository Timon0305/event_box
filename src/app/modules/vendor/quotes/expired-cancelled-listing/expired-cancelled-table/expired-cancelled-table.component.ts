import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { changeQueryParams, CheckRoles } from '@app/core/utils/common.util';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Constants } from '@app/config/constant';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MessageApiService } from '@app/modules/message/service/message-api.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-expired-cancelled-table',
  templateUrl: './expired-cancelled-table.component.html',
  styleUrls: ['./expired-cancelled-table.component.scss'],
  providers: [MessageApiService]
})
export class ExpiredCancelledTableComponent implements OnInit, OnDestroy {
  public expiredQuotes = true;
  @Input() expiredQuoteList;
  @Input() paramsLength = 0;
  @Input() cancelledQuotes;
  quoteStatus = Messages.VENDOR_QUOTE_STATUS;
  readonly destroyed$ = new Subject();
  sortByData;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  isAdmin;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageApiService: MessageApiService,
    private readonly router: Router,
    private readonly checkRoles: CheckRoles
  ) { }

  ngOnInit() {
    this.isAdmin = this.checkRoles.isAdmin();
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.expiredQuotes = params.type === Constants.EXP_CANCELLED_QUOTES.EXPIRED_QUOTES;
      this.sortByData = JSON.parse(JSON.stringify(Constants.AWAITING_QUOTES_LIST_FILTER));
      if (!this.expiredQuotes) {
        this.sortByData = Constants.CANCELED_QUOTES_LIST_FILTER;
      }
    });
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

  fetchUpdatedList(params = {}) {
    changeQueryParams({ ...params }, this.activatedRoute, this.router);

  }

  pageChange(page) {
    this.fetchUpdatedList({ page });
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getQuoteView(quote) {
    const cmpId = this.activatedRoute.snapshot.params.companyId;
    this.router.navigate(
      [
        `${Constants.APPLICATION_ROUTES.admin.vendorManagement}/${this.activatedRoute.snapshot.params.id}/quote-view/${cmpId}/${quote._id}`
      ]
    );

  }

  messagePlanner(quoteId, plannerId) {
    const payload = {
      type: Constants.MESSAGE_TYPE.QUOTE,
      quote: quoteId,
      planner: plannerId
    };
    this.messageApiService.sendMessageAndNavigate(payload, true)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }



}
