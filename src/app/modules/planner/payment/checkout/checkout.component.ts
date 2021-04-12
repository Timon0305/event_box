import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { PlProfileViewService } from '../../profile/pl-profile-view/services/pl-profile-view.service';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [PlProfileViewService]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  profileData$;
  priceAndDiscount$;
  destroy$ = new Subject();
  constructor(
    private readonly cartService: ShoppingCartService, private readonly plProfileViewService: PlProfileViewService,
    private readonly sessionService: SessionManagerService, private readonly router: Router) { }

  ngOnInit() {
    this.profileData$ = this.sessionService.getUserData().pipe(map(res => JSON.parse(JSON.stringify(res))));
    this.priceAndDiscount$ = this.cartService.getPriceAndDiscount();
    this.cartService.getCartData().pipe(takeUntil(this.destroy$)).subscribe();
  }

  makePayment(paymentPayload) {
    paymentPayload.amount = paymentPayload.amount.toFixed(Constants.PRECISION_FIXED);
    this.cartService.makePayment(paymentPayload)
      .pipe(takeUntil(this.destroy$)).subscribe(res => {
        // payment status page
        this.router.navigate([Constants.APPLICATION_ROUTES.planner.finalPayment]);
      });
  }

  setCardAsDefault(cardId) {
    this.plProfileViewService.changeDefaultCreditCard(cardId)
      .pipe(takeUntil(this.destroy$)).subscribe();
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
