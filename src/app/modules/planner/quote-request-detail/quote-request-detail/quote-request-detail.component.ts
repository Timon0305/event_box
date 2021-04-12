import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesSectionService } from '../../quotes-section/services/quotes-section.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MessageApiService } from '@app/modules/message/service/message-api.service';
import { Subject } from 'rxjs/internal/Subject';
import { Messages } from '@app/config/messages';
import { AlertService } from '@app/modules/alert-messages/alert.service';
// tslint:disable-next-line: max-line-length
import { SharedCancelRejectPopupComponent } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup/shared-cancel-reject-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { ViewQuoteRequestComponent } from '@app/shared/view-quote-request/view-quote-request/view-quote-request.component';
import { SharedConfirmationPopupService } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { OrdersService } from '../../orders/orders.service';
import * as moment from 'moment';
import { map } from 'rxjs/internal/operators/map';
import { compareMomentIsAfter, CheckRoles, mapReplyToQuote } from '@app/core/utils/common.util';
import { ViewNoteComponent } from '../../quote-request-folder/view-notes/view-note/view-note.component';
@Component({
  selector: 'app-quote-request-detail',
  templateUrl: './quote-request-detail.component.html',
  styleUrls: ['./quote-request-detail.component.scss'],
  providers: [QuotesSectionService, MessageApiService, OrdersService]
})
export class QuoteRequestDetailComponent implements OnInit, OnDestroy {
  quoteData$;
  constant = Constants;
  dynamicBreadcrumbObj = BreadCrumb.quotesRequestDetail;
  readonly destroyed$ = new Subject();
  shoppingCartRoute = Constants.APPLICATION_ROUTES.planner.shoppingCart;
  isOrder = false;
  isAdmin;
  refundStatus = Constants.REFUND_STATUS;

  supportRoute = Constants.APPLICATION_ROUTES.planner.support;
  isExpiredEvent;
  quoteStatus = Constants.PLANNER_QUOTE_STATUS;
  constructor(
    private readonly request: RequestService, private readonly popupService: SharedConfirmationPopupService,
    private readonly route: ActivatedRoute, private readonly orderService: OrdersService,
    private readonly router: Router,
    private readonly quotesSectionService: QuotesSectionService,
    private readonly flash: AlertService,
    private readonly modalService: NgbModal,
    private readonly messageApiService: MessageApiService,
    private readonly checkRole: CheckRoles) { }

  ngOnInit() {
    this.isAdmin = this.checkRole.isAdmin();
    if (this.route.snapshot.params.quoteId) {
      this.getQuoteData();
    } else if (this.route.snapshot.params.orderId) {
      this.isOrder = true;
      this.getOrderDetails();
    }
  }

  getOrderDetails() {
    this.quoteData$ = this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.orders}/${this.route.snapshot.params.orderId}`);
  }

  messageVendor(quoteId) {
    const payload = {
      type: Constants.MESSAGE_TYPE.QUOTE,
      quote: quoteId
    };
    this.messageApiService.sendMessageAndNavigate(payload)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }

  viewQuote(quote, replyId?) {
    let quoteData = quote;
    // replyId only in case of previous quotes
    if (replyId) {
      quoteData = mapReplyToQuote(quote, replyId);
    }
    const modalRef = this.modalService.open(ViewQuoteRequestComponent, { windowClass: 'modal-extra-large' });
    modalRef.componentInstance.quote = quoteData;
  }

  viewNotes(notes) {
    const modalRef =  this.modalService.open(ViewNoteComponent);
    modalRef.componentInstance.onlyViewNotes = true;
    modalRef.componentInstance.notes = notes.vendorNotes;
   }


  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  acceptQuote(item) {
    const payload = {
      ids: [item._id],
      status: Constants.QUOTE_STATUS.ACCEPTED_QUOTES
    };
    this.quotesSectionService.updateQuoteStatus(payload).pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.flash.showSuccess(Messages.SUCCESS.quoteAccepted);
      this.getQuoteData();
    }, error => {
      this.flash.showError(Messages.ERROR.acceptQuote);
    });
  }

  requestQuoteAgain(item) {
    const payload = {
      ids: [item._id],
      status: Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES
    };
    this.quotesSectionService.updateQuoteStatus(payload).pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.flash.showSuccess(Messages.SUCCESS.requestsend);
      this.router.navigate(['/planner/quotes/awaiting-vendor-quotes/list'], {
        queryParams:
        {
          order: this.constant.DEFAULT_SORTING.plannerAwaitngOrder,
          sort: this.constant.DEFAULT_SORTING.plannerAwaitngSortBy
        }
      });
    }, error => {
      this.flash.showError(Messages.ERROR.acceptQuote);
    });
  }


  rejectQuote(item) {
    const modalRef = this.modalService.open(SharedCancelRejectPopupComponent, { centered: true });
    const data = { title: Constants.CANCEL_REJECT_TITLE_KEY.REJECTED_QUOTES };
    modalRef.componentInstance.quoteDetail = { ...data, ...item };
    modalRef.result.then(res => {
      const payload = {
        ids: [item._id],
        status: Constants.QUOTE_STATUS.REJECTED_QUOTES,
        plannerNotes: res.value.notes,
        wantCuonterOffer: res.value.wantCuonterOffer
      };
      this.quotesSectionService.updateQuoteStatus(payload).pipe(takeUntil(this.destroyed$)).subscribe(() => {
        this.getQuoteData();
      });
    });
  }

  getQuoteData() {
    this.quoteData$ = this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.quotes}/${this.route.snapshot.params.quoteId}`)
      .pipe(map(res => {
        this.isExpiredEvent = compareMomentIsAfter(moment(), res.data.events.endDate, 'minute');
        return res;
      }));
  }

  async deleteQuote(quoteId) {
    const deleteConfirmation = await this.quotesSectionService.openConfirmationPopup(Constants.DELETE_QUOTE);
    if (deleteConfirmation) {
      const payload = { ids: [quoteId] };
      this.quotesSectionService.deleteQuote(payload)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.router.navigate([Constants.APPLICATION_ROUTES.planner.quotePendingpayment],
            { queryParams: Constants.DEFAULT_SORTING_PARAMS.ACCEPTED_QUOTES });
        });
    }
    return;
  }

  cancelOrder(orderId) {
    this.popupService.showPopup(Constants.CANCEL_ORDER_POPUP).result.then(notCancel => {
      if (!notCancel) {
        this.orderService.cancelOrder(orderId).pipe(takeUntil(this.destroyed$))
          .subscribe(res => this.getOrderDetails());
      }
    }).catch();
  }
}
