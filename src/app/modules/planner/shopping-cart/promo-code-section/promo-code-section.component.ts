import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Constants } from '@app/config/constant';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { trackByObjectId } from '@app/core/utils/common.util';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-promo-code-section',
  templateUrl: './promo-code-section.component.html',
  styleUrls: ['./promo-code-section.component.scss']
})
export class PromoCodeSectionComponent implements OnInit, OnDestroy {
  priceAndDiscount$;
  @Input() cartData;
  @Output() getCartData = new EventEmitter();
  private readonly destroy$ = new Subject();
  checkoutRoute = Constants.APPLICATION_ROUTES.planner.checkout;
  trackByFn = trackByObjectId;
  promoCode: FormControl = new FormControl('');
  termsAndConditions: FormControl = new FormControl(false);
  constructor(private readonly cartService: ShoppingCartService, private readonly modalService: NgbModal) { }

  ngOnInit() {
    this.getPriceAndDiscount();
  }

  applyPromoCode() {
    if (this.promoCode.value) {
      this.cartService.applyPromoCode({ promoCode: this.promoCode.value })
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          this.promoCode.reset();
          this.getCartData.emit();
        });
    }
  }

  getPriceAndDiscount() {
    this.priceAndDiscount$ = this.cartService.getPriceAndDiscount();
  }

  removePromoCode(promoCode) {
    this.cartService.removePromoCode({ promoCode })
      .pipe(takeUntil(this.destroy$)).subscribe(res => this.getCartData.emit());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
