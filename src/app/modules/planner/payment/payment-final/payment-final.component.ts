import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-payment-final',
  templateUrl: './payment-final.component.html',
  styleUrls: ['./payment-final.component.scss']
})
export class PaymentFinalComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  quotesList;
  priceAndDiscount$;
  paymentStatus = Constants.PAYMENT_STATUS;
  finalPaymentObj$;
  purchasedOrdersRoute = Constants.APPLICATION_ROUTES.planner.purchasedOrders;
  constructor(private readonly cartService: ShoppingCartService, private readonly router: Router) { }

  ngOnInit() {
    this.priceAndDiscount$ = this.cartService.getPriceAndDiscount();
    this.finalPaymentObj$ = this.cartService.getFinalPaymentObj().pipe(map(res => {
      if (!res) {
        this.router.navigate([this.purchasedOrdersRoute]);
      }
      return res;
    }));
  }

  makePayment(paymentPaylod) {
    paymentPaylod.amount = paymentPaylod.amount.toFixed(Constants.PRECISION_FIXED);
    this.cartService.makePayment(paymentPaylod).pipe(takeUntil(this.destroyed$))
      .subscribe();
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
