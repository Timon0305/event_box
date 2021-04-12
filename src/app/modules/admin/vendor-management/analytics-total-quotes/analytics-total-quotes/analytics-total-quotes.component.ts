import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { QuotesService } from '@app/modules/vendor/quotes/services/quotes.service';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { VendorManagementService } from '../../services/vendor-management.service';

@Component({
  selector: 'app-analytics-total-quotes',
  templateUrl: './analytics-total-quotes.component.html',
  styleUrls: ['./analytics-total-quotes.component.scss'],
  providers: [VendorManagementService]
})
export class AnalyticsTotalQuotesComponent implements OnInit, OnDestroy {
  paramsLength = 0;
  awaitingQuotesObservable$;
  readonly destroyed$ = new Subject();
  queryStrParams;
  defaultSortingParams = Constants.DEFAULT_SORTING_PARAMS.ACCEPT_REJECT_AND_AWAITING_VENDOR_QUOTES;
  constant = Constants;
  companyId;
  vendorId;
  viewType = Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES;
  activeView = Constants.NUMBER.two;
  vendorName = '';
  constructor(
    private readonly route: ActivatedRoute, private readonly vendorMgmtService: VendorManagementService,
    private readonly router: Router,
    private readonly quotesService: QuotesService
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.vendorId = this.route.snapshot.paramMap.get('id');
    this.getQuotesData();
    this.getVendorName();
  }

  fetchUpdatedList(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  getVendorName() {
    if (this.vendorId) {
      this.vendorMgmtService.getVendorName(this.vendorId)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.vendorName = res.vendorName;
        });
    }
  }

  getUpdatedList(event) {
    if (event) {
      this.getQuotesData();
    }
  }

  getQuotesData(parameters?) {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.viewType = params.type;
      const sortingParams = { ...params };
      this.paramsLength = Object.keys(params).length;
      if (this.route.snapshot.queryParams.type === Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES) {
        this.getAwaitingQuotes({ ...this.defaultSortingParams, ...sortingParams, ...this.queryStrParams });
      }
    });
  }

  getAwaitingQuotes(options?) {
    this.awaitingQuotesObservable$ = this.quotesService.getAdminQuotesList(options);
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

  navigateToUpcoming(routeType, index, sortParameters) {
    this.viewType = routeType;
    this.activeView = index;
    let routeUrl = routeType;
    if (this.activeView === Constants.NUMBER.one) {
      routeUrl = Constants.QUOTE_STATUS.EXPIRED_QUOTES;
    } else if (this.activeView === Constants.NUMBER.two) {
      routeUrl = Constants.QUOTE_STATUS.CANCELED_QUOTES;
    }
    this.router.navigate(
      [`${Constants.APPLICATION_ROUTES.admin.vendorManagement}/${this.vendorId}${Constants.APPLICATION_ROUTES.admin.adminVendorAllQuotes}`,
      this.companyId],
      {
        queryParams:
        {
          role: Constants.Role.VENDOR, id: this.companyId,
          type: routeUrl, order: Constants.NUMBER.one,
          sort: sortParameters
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


}
