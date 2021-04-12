import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IApiSuccess } from '@app/models/IApiResponse';
import { LoaderService } from '@app/core/services/loader.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable()

export class QuotesService {
  constructor(private readonly request: RequestService, private readonly loader: LoaderService) { }

  getQuotesList(options?) {
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.quotes, options).pipe(map(res => res.data));
  }

  getQuoteById(quoteId, isAdmin = false) {
    const endpoint = isAdmin ? `${Constants.ENDPOINTS.adminQuoteDetail}/${quoteId}` : `${Constants.ENDPOINTS.quotes}/${quoteId}`;
    return this.request.get<IApiSuccess>(endpoint).pipe(map(res => res));
  }
  updateQuoteStatus(options) {
    this.loader.start();
    return this.request.patch(Constants.ENDPOINTS.updateQuoteStatus, options).pipe(map(res => {
      this.loader.stop();
      return res;
    }), catchError(error => {
      this.loader.stop();
      return throwError(error);
    }));
  }

  getOrderById(orderId, isAdmin = false) {
    const endpoint = isAdmin ? `${Constants.ENDPOINTS.adminOrders}/${orderId}` : `${Constants.ENDPOINTS.orders}/${orderId}`;
    return this.request.get<IApiSuccess>(endpoint).pipe(map(res => res));
  }

  getAdminQuotesList(options?) {
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.adminQuotes, options).pipe(map(res => res.data));
  }

  vendorCancelQuote(modalRef, id, status) {
    modalRef.componentInstance.showCunterOfferReq = false;
    const data = {
      title: Constants.CANCEL_REJECT_TITLE_KEY.CANCELED_QUOTES,
    };
    if (status === Constants.QUOTE_STATUS.REJECTED_BY_VENDOR) {
      data.title = Constants.CANCEL_REJECT_TITLE_KEY.REJECTED_QUOTES;
    }
    modalRef.componentInstance.quoteDetail = data;
    return modalRef.result.then(notesForm => {
      return {
        ids: [id],
        status,
        vendorNotes: notesForm.value.notes
      };
    });
  }
}
