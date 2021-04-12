import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { LoaderService } from '@app/core/services/loader.service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { getDatetoISOFormat } from '@app/core/utils/common.util';
@Injectable()
export class ViewReportService {
    constructor(private readonly request: RequestService, private readonly loader: LoaderService) {
    }

    getReportsData(params) {
        if (params.dateFrom && params.dateTo) {
            params = getDatetoISOFormat(Constants.DATE_RANGE_FIELDS, { ...params });
        }
        this.loader.start();
        return this.request.get<IApiSuccess>(Constants.ENDPOINTS.adminReports, params).pipe(map(res => {
            this.loader.stop();
            if (res.data.products.productPurchased) {
                res.data.orders.averagePurchasedOrders = (res.data.products.productPurchased / res.data.orders.purchased)
                    .toFixed(Constants.AVG_PURCHASED_ORDERS_PRECISON);
            } else {
                res.data.orders.averagePurchasedOrders = 0;
            }
            return res.data;
        }), catchError(error => {
            this.loader.stop();
            return throwError(error);
        }));
    }
}
