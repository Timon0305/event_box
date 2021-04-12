import { Injectable } from '@angular/core';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { RequestService } from '@app/core/http/request-service';

@Injectable()
export class OrderService {

  constructor(private readonly request: RequestService) { }

  getQuotesList(options?) {
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.orders, options).pipe(map(res => res.data));
  }

  getAdminQuotesList(options?) {
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.adminOrders, options).pipe(map(res => res.data));
  }
}
