import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { LoaderService } from '@app/core/services/loader.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
@Injectable()
export class AchReportService {

  constructor(private readonly request: RequestService, private readonly loader: LoaderService) { }


  getAchReportList(params) {
    this.loader.start();
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.adminAchPayout}`, params)
      .pipe(map(res => {
        this.loader.stop();
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  getDateAchReportList(date, params) {
    setTimeout(() => this.loader.start());
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.adminAchPayout}/${date}`, params)
      .pipe(map(res => {
        this.loader.stop();
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  getOrdersList({ date, payoutTo }, params) {
    this.loader.start();
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.adminAchPayout}/${date}/payout-to/${payoutTo}`, params)
      .pipe(map(res => {
        this.loader.stop();
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  getOrderById(orderId) {
    this.loader.start();
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.adminOrders}/${orderId}`)
      .pipe(map(res => {
        this.loader.stop();
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }
}
