import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { LoaderService } from '@app/core/services/loader.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ExportService } from '@app/core/services/common/export.service';
import { ActivatedRoute } from '@angular/router';
import { getDatetoISOFormat } from '@app/core/utils/common.util';

@Injectable()
export class OrdersService {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly exportService: ExportService,
    private readonly request: RequestService, private readonly loaderService: LoaderService) { }

  getOrderList(params, isAdmin = false, plannerId) {
    if (plannerId) {
      params = {
        ...params,
        id: plannerId,
        role: Constants.Role.PLANNER
      };
    }
    const endpoint = isAdmin ? Constants.ENDPOINTS.adminOrders : Constants.ENDPOINTS.orders;
    return this.request.get<IApiSuccess>(endpoint, params).pipe(map(res => res));
  }

  cancelOrder(orderId) {
    this.loaderService.start();
    return this.request.put<IApiSuccess>(`${Constants.ENDPOINTS.orders}/${orderId}`)
      .pipe(map(res => {
        this.loaderService.stop();
        return res;
      }), catchError(error => {
        this.loaderService.stop();
        return throwError(error);
      }));
  }

  fetchReport(status, dateRangeComponent, roleBasedPayload) {
    let payload = {
      ...(dateRangeComponent.getDateFromDateTo()),
      exportType: Constants.EXPORTS_DATA.orders.exportType, // Order
      status // Status PURCHASED, CANCELED
    };
    if (payload.dateFrom && payload.dateTo) {
      payload = getDatetoISOFormat(Constants.DATE_RANGE_FIELDS, { ...payload });
    }
    if (roleBasedPayload) {
      payload = {
        ...payload,
        ...roleBasedPayload
      };
    }
    return this.exportService.export(payload)
      .pipe(map(res => {
        dateRangeComponent.clearDate();
        return res;
      }));
  }

  getRoleBasedPayload(isAdmin, id) {
    return isAdmin && id && {
      role: Constants.Role.PLANNER,
      id
    };
  }
}
