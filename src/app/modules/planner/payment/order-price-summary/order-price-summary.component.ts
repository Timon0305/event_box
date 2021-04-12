import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-price-summary',
  templateUrl: './order-price-summary.component.html',
  styleUrls: ['./order-price-summary.component.scss']
})
export class OrderPriceSummaryComponent implements OnInit {
  @Input() fromPayment;
  @Input() priceAndDiscount;
  constructor() { }

  ngOnInit() {
  }

}
