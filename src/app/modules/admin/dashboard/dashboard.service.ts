import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { LoaderService } from '@app/core/services/loader.service';
import { map } from 'rxjs/internal/operators/map';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import * as moment from 'moment';
import { Params } from '@angular/router';
import { getDatetoISOFormat } from '@app/core/utils/common.util';
@Injectable()
export class DashboardService {

  constructor(private readonly request: RequestService, private readonly loader: LoaderService) { }

  getAnalytics(params: Params = {}) {
    if (params.dateFrom && params.dateTo) {
      params = getDatetoISOFormat(Constants.DATE_RANGE_FIELDS, {...params});
    }
    this.loader.start();
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.dashboardData, params).pipe(map(res => {
      this.loader.stop();
      return res.data;
    }), catchError(error => {
      this.loader.stop();
      return throwError(error);
    }));
  }

  getOrderList(params, isAdmin = false) {
    const endpoint = Constants.ENDPOINTS.adminOrders;
    return this.request.get<IApiSuccess>(endpoint, params).pipe(map(res => res));
  }

  getGraphAnalytics(params) {
    const endpoint = Constants.ENDPOINTS.adminGraphPoints;
    if (params.dateFrom && params.dateTo) {
      params = getDatetoISOFormat(Constants.DATE_RANGE_FIELDS, {...params});
    }
    return this.request.get<IApiSuccess>(endpoint, params).pipe(map(res => res));
  }
}
