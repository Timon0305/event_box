import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { map } from 'rxjs/internal/operators/map';
import { sumArrayOfObjectkey } from '@app/core/utils/common.util';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {
  shoppingCartData$;
  loading = false;
  cartData;
  itemCount = 0;
  constructor(private readonly cartService: ShoppingCartService) { }

  ngOnInit() {
    this.getCartData();
  }

  getCartData() {
    this.loading = true;
    this.shoppingCartData$ = this.cartService.getCartData().pipe(map(res => {
      this.cartData = res;
      this.loading = false;
      this.itemCount = sumArrayOfObjectkey(res.quotes, 'quantity');
      return res;
    }));
  }

}
