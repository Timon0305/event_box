import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { sumArrayOfObjectkey } from '@app/core/utils/common.util';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError } from 'rxjs/internal/operators/catchError';
import { LoaderService } from '@app/core/services/loader.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  priceAndDiscount$: BehaviorSubject<{ [index: string]: number }> = new BehaviorSubject({});
  finalPaymentObj$ = new BehaviorSubject(null);

  constructor(private readonly request: RequestService, private readonly loaderService: LoaderService) { }

  getCartData() {
    this.loaderService.start();
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.cart)
      .pipe(map(res => {
        this.loaderService.stop();
        this.calculatePriceAndDiscounts(res.data);
        return res.data;
      }), catchError(error => {
        this.loaderService.stop();
        return throwError(error);
      }));
  }

  applyPromoCode(payload) {
    this.loaderService.start();
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.promoCode, payload)
      .pipe(map(res => {
        this.loaderService.stop();
        return res;
      }), catchError(error => {
        this.loaderService.stop();
        return throwError(error);
      }));
  }

  removePromoCode(payload) {
    this.loaderService.start();
    return this.request.deleteWithBody<IApiSuccess>(Constants.ENDPOINTS.promoCode, payload)
      .pipe(map(res => {
        this.loaderService.stop();
        return res;
      }), catchError(error => {
        this.loaderService.stop();
        return throwError(error);
      }));
  }

  calculatePriceAndDiscounts(cartData) {
    const priceAndDiscount: { [index: string]: number }
      = { totalAmount: 0, totalItems: 0, couponAmount: 0, amountToPay: 0, promoCodeLength: 0, itemCount: 0 };
    if (cartData.quotes) {
      priceAndDiscount.totalAmount = sumArrayOfObjectkey(cartData.quotes, 'totalPrice');
      const discounts = cartData.quotes.map(quote => quote.discount).filter(res => !!res);
      priceAndDiscount.couponAmount = sumArrayOfObjectkey(discounts, 'discountAmount');
      priceAndDiscount.amountToPay = sumArrayOfObjectkey(discounts, 'finalAmount');
      priceAndDiscount.totalItems = sumArrayOfObjectkey(cartData.quotes, 'quantity');
      priceAndDiscount.promoCodeLength = cartData.promoCodes.length;
    }
    this.priceAndDiscount$.next(priceAndDiscount);
  }

  makePayment(paymentPayload) {
    this.loaderService.start();
    const { amount, source, cvv, skipSave = false } = paymentPayload;
    const paymentObj = cvv ? { amount, source, cvv, skipSave } : { amount, source, skipSave };
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.payment, paymentObj).pipe(map(res => {
      this.loaderService.stop();
      this.setFinalPaymentObj({quotesList: res.data, paymentPayload});
      return res;
    }), catchError(error => {
      this.loaderService.stop();
      return throwError(error);
    }));
  }

  getPriceAndDiscount() {
    return this.priceAndDiscount$;
  }

  setFinalPaymentObj(payload) {
    this.finalPaymentObj$.next(payload);
  }

  getFinalPaymentObj() {
    return this.finalPaymentObj$;
  }
}
