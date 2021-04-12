import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CheckRoles } from '@app/core/utils/common.util';
import { VendorManagementService } from '@app/modules/admin/vendor-management/services/vendor-management.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-product-rating-review-list-item',
  templateUrl: './product-rating-review-list-item.component.html',
  styleUrls: ['./product-rating-review-list-item.component.scss']
})
export class ProductRatingReviewListItemComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  @Input() referrer;
  @Input() ratingNreviewData;
  isAdmin = false;
  constructor(
    private checkRoles: CheckRoles,
    private readonly vendorManagementService: VendorManagementService
  ) { }
  ngOnInit() {
    this.isAdmin = this.checkRoles.isAdmin();
  }

  removeItem(item) {
    const modalRef = this.vendorManagementService.openConfirmationPopup(Constants.DELETE_RATING);
    modalRef.result.then(res => {
      if (res) {
        this.vendorManagementService.deleteReview(item._id).pipe(takeUntil(this.destroyed$)).subscribe(
          data => {
            this.vendorManagementService.manageReviewList.emit(true);
          }
        );
      }
    }).catch();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
}

}
