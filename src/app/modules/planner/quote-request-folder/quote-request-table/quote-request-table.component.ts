import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { trackByObjectId } from '@app/core/utils/common.util';
import { ViewNoteComponent } from '../view-notes/view-note/view-note.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuoteRequestFolderService } from '../services/quote-request-folder.service';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from '@app/core/services/loader.service';
import { Constants } from '@app/config/constant';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { ViewQuoteVariableComponent } from '../view-quote-variable/view-quote-variable.component';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CommonService } from '@app/core/services/common/common.service';
import { take } from 'rxjs/internal/operators/take';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-quote-request-table',
  templateUrl: './quote-request-table.component.html',
  styleUrls: ['./quote-request-table.component.scss']
})
export class QuoteRequestTableComponent implements OnInit, OnDestroy {
  quoteRequestFolderData;
  showFilters = false;
  form: FormGroup;
  defaultSorting = Constants.DEFAULT_SORTING;
  sortByData = Constants.QUOTE_REQ_FOLDER_LIST_FILTER.filter(data =>
    data.value.sort !== Constants.SORT_FIELDS.quoteRequestedDate);
  @Input() set setQuoteRequestFolderData(value) {
    if (value) {
      this.showFilters = value.totalDocs > 0 || this.paramsLength > 0;
      this.quoteRequestFolderData = value;
    }
  }
  trackByFn = trackByObjectId;
  @Output() fetchList = new EventEmitter();
  @Output() checkListArr = new EventEmitter<boolean>();
  @Input() paramsLength;
  readonly destroyed$ = new Subject();
  checkList: Array<string> = [];
  constructor(
    private readonly modalService: NgbModal, private readonly quoteReqFolderService: QuoteRequestFolderService,
    private readonly loader: LoaderService, private readonly alert: AlertService,
    private readonly router: Router, private readonly commonService: CommonService
  ) { }

  ngOnInit() {
    this.form = this.quoteReqFolderService.createViewForm();
    // refresh sidebar count of quote request folder
    this.commonService.getHeaderCountApi().pipe(take(1)).subscribe();
  }

  pageChange(page) {
    this.fetchList.emit({ page });
    this.checkList = [];
  }

  viewNotes(quote, note) {
    const modalRef = this.modalService.open(ViewNoteComponent, { centered: true });
    this.form.patchValue({ notes: note });
    modalRef.componentInstance.form = this.form;
    modalRef.result.then(result => {
      if (result) {
        this.quoteReqFolderService.updateNotes(quote._id, result.value).pipe(takeUntil(this.destroyed$))
          .subscribe((res) => {
            quote.notes = res.data.notes;
          }, error => {
          });
      }
    }).catch(error => {
    });
  }

  changeQuantity(quote, counter) {
    let lastUpdatedQuantity: number;
    if (!(quote.quantity <= Constants.MIN_QUANTITY && counter === Constants.DECREAMENT_QUANTITY_KEY)) {
      quote.quantity = (
        counter === Constants.DECREAMENT_QUANTITY_KEY ?
          Number(quote.quantity) - 1 :
          Number(quote.quantity) + 1
      );
      this.quoteReqFolderService.updateQuoteQuantity(quote._id, { counter })
        .pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
          lastUpdatedQuantity = res.data.quantity;
        }, error => {
          quote.quantity = lastUpdatedQuantity;
        });
    }

  }

  updateSingleQuoteStatus(quoteId, docLength?) {
    this.updateQuoteStatus([quoteId]);
  }

  toggleSelectAll(event) {
    if (event.target.checked) {
      this.checkList = this.quoteRequestFolderData.docs.map(quote => quote._id);
    } else {
      this.checkList = [];
    }
    this.checkListArr.emit(this.checkList.length > 0);
  }

  toggleCheck(event, id) {
    if (event.target.checked) {
      this.checkList.push(id);
    } else {
      this.uncheckQuote(id);
    }
    this.checkListArr.emit(this.checkList.length > 0);
  }

  uncheckQuote(id) {
    const index = this.checkList.findIndex(checkedItemId => checkedItemId === id);
    if (index >= 0) {
      this.checkList.splice(index, 1);
    }
  }

  get checkAll() {
    return this.checkList.length === this.quoteRequestFolderData.docs.length;
  }

  viewQuoteVariable(item) {
    const modalRef = this.modalService.open(ViewQuoteVariableComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.quoteInfo = item;
    modalRef.result.then(result => {
      if (result) {
        this.fetchList.emit({ getData: true });
      }
    }).catch(error => {
    });
  }

  delete(id) {
    this.openPopup(false, id);
  }

  deleteSelected() {
    this.openPopup(true);
  }

  openPopup(fromSelected, quoteId?) {
    const metaData = fromSelected ? Constants.DELETE_SELECTED_PRODUCT_FROM_QUOTE_LIST : Constants.DELETE_PRODUCT_FROM_QUOTE_LIST;
    const modalRef = this.quoteReqFolderService.openPopup(metaData);
    modalRef.result.then(result => {
      if (!result) {
        this.loader.start();
        const ids = fromSelected ? this.checkList : [quoteId];
        this.quoteReqFolderService.deleteQuotes(ids)
          .pipe(takeUntil(this.destroyed$)).subscribe(res => {
            if (fromSelected) {
              this.checkList = [];
            }
            this.fetchList.emit({ getData: true });
            this.loader.stop();
            const message = fromSelected ? Messages.SUCCESS.deleteSelectedQuoteFolder : Messages.SUCCESS.deleteSuccessQuoteFolder;
            this.alert.showSuccess(message);
          }, error => this.loader.stop());
      }
    }).catch(error => error);
  }

  sendRequestToSelected() {
    this.updateQuoteStatus(this.checkList);
  }

  updateQuoteStatus(quoteIdArray) {
    this.loader.start();
    this.quoteReqFolderService.updateSelectedQuotes(quoteIdArray, Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.checkList = [];
        if (Number(this.quoteRequestFolderData.totalDocs) === quoteIdArray.length) {
          this.router.navigate(['/planner/quotes/awaiting-vendor-quotes/list'], {
            queryParams:
            {
              order: this.defaultSorting.plannerAwaitngOrder,
              sort: this.defaultSorting.plannerAwaitngSortBy
            }
          });
        } else {
          this.fetchList.emit({ getData: true });
        }
        this.commonService.getHeaderCountApi().pipe(takeUntil(this.destroyed$)).subscribe();
        this.loader.stop();
        this.alert.showSuccess(Messages.SUCCESS.quoteReqSent);
      }, error => this.loader.stop());
  }

  search(searchTerm) {
    const filter = searchTerm || null;
    this.fetchList.emit({ filter });
  }

  sortFilterChange(params) {
    this.fetchList.emit(params);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
