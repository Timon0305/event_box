import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotesService } from '../../services/quotes.service';
// tslint:disable-next-line: max-line-length
import { SharedCancelRejectPopupComponent } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup/shared-cancel-reject-popup.component';
import { Constants } from '@app/config/constant';
import { MessageApiService } from '@app/modules/message/service/message-api.service';

import { Subject } from 'rxjs/internal/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { RequestQuoteComponent } from '@app/shared/request-quote/request-quote/request-quote.component';
import { Messages } from '@app/config/messages';
import { ViewQuoteRequestComponent } from '@app/shared/view-quote-request/view-quote-request/view-quote-request.component';
import { CheckRoles, mapReplyToQuote } from '@app/core/utils/common.util';
import { Location } from '@angular/common';
import { PlannerManagementService } from '@app/modules/admin/planner-management/services/planner-management.service';
import { AdminViewQuoteComponent } from '@app/modules/admin/vendor-management/admin-view-quote/admin-view-quote/admin-view-quote.component';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { ViewNoteComponent } from '@app/modules/planner/quote-request-folder/view-notes/view-note/view-note.component';
import { VendorManagementService } from '@app/modules/admin/vendor-management/services/vendor-management.service';
import { PartnerAddProfileService } from '@app/modules/partner/partner-add-profile/services/partner-add-profile.service';

@Component({
  selector: 'app-quote-view',
  templateUrl: './quote-view.component.html',
  styleUrls: ['./quote-view.component.scss'],
  providers: [QuotesService, MessageApiService, VendorManagementService]
})
export class QuoteViewComponent implements OnInit, OnDestroy {
  quoteDataObservable$;
  readonly destroyed$ = new Subject();
  constant = Constants;
  currentDate = new Date().toISOString();
  dynamicBreadcrumbObj = BreadCrumb.vendorQuoteDetail;
  adminDynamicBreadcrumbObj = BreadCrumb.adminOrderDetails;
  purchasedOrderListBreadcrumb = BreadCrumb.adminPurchasedOrderList;
  adminQuoteDetailBreadcrumb = BreadCrumb.adminQuotesRequestDetail;
  adminEventDetailQuoteBreadcrumb = BreadCrumb.adminEventDetails;
  quoteStatus = Messages.VENDOR_QUOTE_STATUS;
  openDetail = false;
  orderType;
  isAdmin;
  navigationId;
  quoteHeading = Constants.PLANNER_QUOTE_HEADING;
  plannerId;
  role;
  plannerName;
  eventViewId;
  vendorName;
  partnerId;
  partnerName$;
  partnerDetails$;
  partnerRole = Constants.Role.PARTNER;
  timezoneMap = Constants.TIME_ZONE_DISPLAY_MAP;
  constructor(
    private readonly addProfileService: PartnerAddProfileService,
    private readonly quotesService: QuotesService, private readonly checkRole: CheckRoles,
    public activatedRoute: ActivatedRoute, private readonly location: Location,
    private readonly modalService: NgbModal, private readonly plannerMgmtService: PlannerManagementService,
    private readonly messageApiService: MessageApiService,
    private readonly sessionService: SessionManagerService,
    private readonly vendorMgmtService: VendorManagementService
  ) { }

  ngOnInit() {
    this.partnerId = this.activatedRoute.snapshot.params.partnerId;
    if (this.partnerId) {
      this.getPartnerName();
    }
    this.role = this.sessionService.getRole();
    this.eventViewId = this.activatedRoute.snapshot.params.eventViewId;
    this.plannerId = this.activatedRoute.snapshot.params.plannerId;
    if (this.plannerId) {
      this.getPlannerName();
    }
    this.isAdmin = this.checkRole.isAdmin();
    this.navigationId = this.activatedRoute.snapshot.queryParams.navigationId;
    if (this.activatedRoute.snapshot.params.quoteViewId) {
      this.getQuoteDetail();
    } else {
      this.orderType = this.activatedRoute.snapshot.queryParams.type;
      this.getOrderDetails();
    }

    this.getVendorName();

  }

  getPartnerName() {
    this.partnerName$ = this.addProfileService.getPartnerName();
    this.partnerDetails$ = this.addProfileService.getPartnerDetailsApi(this.activatedRoute.snapshot.params.partnerId);
  }

  viewNotes(notes) {
    const modalRef = this.modalService.open(ViewNoteComponent, { centered: true });
    modalRef.componentInstance.onlyViewNotes = true;
    modalRef.componentInstance.notes = notes.plannerNotes;
  }


  getOrderDetails() {
    const orderId = this.activatedRoute.snapshot.params.orderId;
    this.quoteDataObservable$ = this.quotesService.getOrderById(orderId, this.isAdmin);

  }

  back() {
    this.location.back();
  }

  viewQuote(order, replyId?) {
    let quoteData = order;
    // replyId only in case of previous quotes
    if (replyId) {
      quoteData = mapReplyToQuote(order, replyId);
    }
    const modalRef = this.modalService.open(ViewQuoteRequestComponent, { windowClass: Constants.MODAL_EXTRA_LG });
    modalRef.componentInstance.quote = quoteData;
  }

  viewQuoteFromAdmin(order) {
    const modalRef = this.modalService.open(AdminViewQuoteComponent, { windowClass: Constants.MODAL_EXTRA_LG });
    modalRef.componentInstance.order = order;
  }

  getQuoteDetail() {
    const quoteId = this.activatedRoute.snapshot.params.quoteViewId;
    this.quoteDataObservable$ = this.quotesService.getQuoteById(quoteId, this.isAdmin);
  }

  cancelQuote(quoteId) {
    const modalRef = this.modalService.open(SharedCancelRejectPopupComponent, { centered: true });
    this.quotesService.vendorCancelQuote(modalRef, quoteId, Constants.QUOTE_STATUS.CANCELED_QUOTES).then(payload => {
      this.updateQuoteStatus(payload);
    }).catch(res => res);
  }


  requote(quote, counterOffer) {
    const modalRef = this.modalService.open(RequestQuoteComponent,
      { backdrop: 'static', keyboard: false, windowClass: Constants.MODAL_EXTRA_LG });
    if (counterOffer) {
      quote.counterOffer = true;
      if (quote.latestReply) {
        quote.lastReplyDate = quote.latestReply.updatedAt;
        if (!quote.wantCuonterOffer) {
          delete quote.latestReply;
        }
      }
    }
    modalRef.componentInstance.quote = quote;
    modalRef.result.then(res => {
      this.getQuoteDetail();

    }).catch(error => error);
  }

  messagePlanner(plannerId, quoteId) {
    const payload = {
      type: Constants.MESSAGE_TYPE.QUOTE,
      quote: this.activatedRoute.snapshot.params.quoteViewId || quoteId,
      planner: plannerId
    };
    this.sendMessageApi(payload);
  }

  messagePlannerOrder(planner, order) {
    const payload = {
      type: Constants.MESSAGE_TYPE.ORDER,
      order,
      planner
    };
    this.sendMessageApi(payload);
  }

  sendMessageApi(payload) {
    this.messageApiService.sendMessageAndNavigate(payload, true)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }

  getPlannerName() {
    this.plannerMgmtService.getPlannerName(this.plannerId).pipe(takeUntil(this.destroyed$))
      .subscribe(res => this.plannerName = res.plannerName);
  }

  rejectQuote(quoteId) {
    const modalRef = this.modalService.open(SharedCancelRejectPopupComponent, { centered: true });
    this.quotesService.vendorCancelQuote(modalRef, quoteId, Constants.QUOTE_STATUS.REJECTED_BY_VENDOR).then(payload => {
      this.updateQuoteStatus(payload);
    }).catch(res => res);
  }

  updateQuoteStatus(payload) {
    this.quotesService.updateQuoteStatus(payload).pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.getQuoteDetail();
      });
  }

  getVendorName() {
    if (this.activatedRoute.snapshot.params.companyId) {
      this.vendorMgmtService.getVendorName(this.activatedRoute.snapshot.params.id)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.vendorName = res.vendorName;
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
