import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyallProductRatingReviewListRoutingModule } from './myall-product-rating-review-list-routing.module';
import { MyallProductRatingReviewListComponent } from './myall-product-rating-review-list/myall-product-rating-review-list.component';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
// tslint:disable-next-line:max-line-length
import { SharedProductRatingReviewListItemModule } from '@app/shared/shared-product-rating-review-list-item/shared-product-rating-review-list-item.module';
import { VendorManagementService } from '@app/modules/admin/vendor-management/services/vendor-management.service';

@NgModule({
  declarations: [MyallProductRatingReviewListComponent],
  imports: [
    CommonModule,
    MyallProductRatingReviewListRoutingModule,
    SortByFilterModule,
    SharedSearchModule,
    PaginationModule,
    SharedProductRatingReviewListItemModule
  ],
  providers: [VendorManagementService]
})
export class MyallProductRatingReviewListModule { }
