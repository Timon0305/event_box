import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { trackByObjectId } from '@app/core/utils/common.util';
import { QuotesSectionService } from '@app/modules/planner/quotes-section/services/quotes-section.service';
import { Constants } from '@app/config/constant';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ViewQuoteRequestComponent } from '@app/shared/view-quote-request/view-quote-request/view-quote-request.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@app/core/services/common/common.service';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-shared-cart-table',
  templateUrl: './shared-cart-table.component.html',
  styleUrls: ['./shared-cart-table.component.scss'],
  providers: [QuotesSectionService]
})
export class SharedCartTableComponent implements OnInit, OnDestroy {
  @Input() finalPaymentPage;
  @Input() quotesList;
  @Output() fetchCartData = new EventEmitter();
  trackByFn = trackByObjectId;
  readonly destroyed$ = new Subject();
  mapTimezone = Constants.TIME_ZONE_DISPLAY_MAP;

  constructor(
    private readonly commonService: CommonService,
    private readonly quotesSectionService: QuotesSectionService,
    private readonly modalService: NgbModal) { }

  ngOnInit() {
  }

  async deleteQuote(quoteId, index) {
    const deleteConfirmation = await this.quotesSectionService.openConfirmationPopup(Constants.DELETE_PRODUCT_FROM_QUOTE_LIST);
    if (!deleteConfirmation) {
      const payload = { ids: [quoteId] };
      this.quotesSectionService.deleteQuote(payload)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.commonService.getHeaderCountApi().pipe(take(1)).subscribe();
          this.fetchCartData.emit();
        }
        );
    }
  }
  viewQuote(quoteId) {
    this.quotesSectionService.getQuoteById(quoteId).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.openQuoteOrderPopup(res);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  viewOrder(orderId) {
    this.quotesSectionService.getOrderById(orderId).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.openQuoteOrderPopup(res);
    });
  }

  openQuoteOrderPopup(quoteOrderData) {
    const modalRef = this.modalService.open(ViewQuoteRequestComponent, { windowClass: 'modal-extra-large' });
    modalRef.componentInstance.quote = quoteOrderData;
  }
}
