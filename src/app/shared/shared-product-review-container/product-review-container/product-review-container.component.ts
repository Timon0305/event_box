import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-review-container',
  templateUrl: './product-review-container.component.html',
  styleUrls: ['./product-review-container.component.scss']
})
export class ProductReviewContainerComponent implements OnInit {
  @Input() product;
  constructor() { }

  ngOnInit() {
  }

}
