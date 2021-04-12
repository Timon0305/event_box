import { Component, OnInit, Input } from '@angular/core';
import { CheckRoles } from '@app/core/utils/common.util';

@Component({
  selector: 'app-product-rating-review-table-head',
  templateUrl: './product-rating-review-table-head.component.html',
  styleUrls: ['./product-rating-review-table-head.component.scss']
})
export class ProductRatingReviewTableHeadComponent implements OnInit {

  @Input() referrer;
  isAdmin = false;
  constructor(
    private checkRoles: CheckRoles
  ) { }

  ngOnInit() {
    this.isAdmin = this.checkRoles.isAdmin();
  }

}
