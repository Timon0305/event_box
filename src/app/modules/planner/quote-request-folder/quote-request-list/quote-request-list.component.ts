import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { QuoteRequestFolderService } from '../services/quote-request-folder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-quote-request-list',
  templateUrl: './quote-request-list.component.html',
  styleUrls: ['./quote-request-list.component.scss'],
  providers: [QuoteRequestFolderService]
})
export class QuoteRequestListComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  quoteRequestFolderData$;
  addFixedFooterClassSidebar = false;
  addFixedFooterPaddingClassSidebar = false;
  paramsLength;
  // @Output() emitTest = new EventEmitter();
  constructor(
    private readonly quoteReqFolderService: QuoteRequestFolderService,
    private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.route.queryParams.
      pipe(takeUntil(this.destroyed$)).subscribe(params => {
        this.getQuoteRequestFolderListData(params);
        this.paramsLength = Object.keys(params).length;
      });
  }

  updateQueryParams(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  fetchList(params) {
    return params.getData ?
      this.getQuoteRequestFolderListData(this.route.snapshot.queryParams)
      : this.updateQueryParams(params);
  }

  getQuoteRequestFolderListData(options) {
    this.quoteRequestFolderData$ = this.quoteReqFolderService.getQuoteRequestFolderList
      ({ ...options, type: Constants.QUOTE_STATUS.INITIATED });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toggleClassVariables(isCheckList) {
    this.addFixedFooterClassSidebar = isCheckList;
    this.addFixedFooterPaddingClassSidebar = isCheckList;
  }

}
