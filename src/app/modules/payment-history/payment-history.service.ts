
import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { LoaderService } from '@app/core/services/loader.service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { isAdmin } from '@app/core/utils/common.util';

@Injectable()
export class PaymentHistoryService {

  constructor(
    private sessionService: SessionManagerService,
    private readonly loader: LoaderService, private readonly request: RequestService) { }
  getPaymentHistory(params) {
    const endpoint = this.isAdmin() ? Constants.ENDPOINTS.paymentHistoryAdmin : Constants.ENDPOINTS.paymentHistoryVendor;
    this.loader.start();
    return this.request.get<IApiSuccess>(endpoint, params).pipe(map(res => {
      this.loader.stop();
      return res.data;
    }), catchError(error => {
      this.loader.stop();
      return throwError(error);
    }));
  }

  getPayoutList(params) {
    const endpoint = this.isAdmin() ? Constants.ENDPOINTS.adminPayouts :
      Constants.ENDPOINTS.vendorPayouts;
    this.loader.start();
    return this.request.get<IApiSuccess>(endpoint, params).pipe(map(res => {
      this.loader.stop();
      return res.data;
    }), catchError(error => {
      this.loader.stop();
      return throwError(error);
    }));
  }

  isAdmin() {
    return isAdmin(this.sessionService.getRole());
  }
}
