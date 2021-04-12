import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';

@Injectable()
export class RatingReviewService {
  constructor(
    private readonly request: RequestService,
    private readonly loaderService: LoaderService,
    private readonly router: Router,
  ) { }

  getRatingNReviewList(paramsReceived = {}) {
    const ratingNReviewListUrl = `${Constants.ENDPOINTS.orders}`;
    const params = { type: Constants.ORDER_TYPES.FULFILLED_ORDERS , ...paramsReceived};
    return this.request.get<IApiSuccess>(ratingNReviewListUrl, params)
      .pipe(
        map(res => {
          return res.data;
        }
        )
      );
  }

  getVendorRatingNReviewList(params?: Params) {
    this.loaderService.start();
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.reviews}`, params)
      .pipe(
        map(res => {
          this.loaderService.stop();
          return res.data;
        }
        )
      );
  }

  getProductRatingNReview(productId, eventId) {
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.reviews}/${productId}/${eventId}`)
      .pipe(
        map(res => {
          return res.data;
        })
      );
  }

  postReview(options) {
    return this.request.post(Constants.ENDPOINTS.reviews, options).pipe(map(res => res));
  }

  redirect(params) {
    this.router.navigate([this.router.url.split('?')[0]], { queryParams: params });
  }
}
