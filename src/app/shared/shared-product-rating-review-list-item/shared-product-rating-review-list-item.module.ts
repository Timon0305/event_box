import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatingReviewListItemComponent } from './product-rating-review-list-item/product-rating-review-list-item.component';
import { NoImageDirectiveModule } from '../no-image-directive/no-image-directive.module';
import { SharedViewRatingStarModule } from '../shared-view-rating-star/shared-view-rating-star.module';
import { SharedPlannerNamePipeModule } from '../shared-planner-name-pipe/shared-planner-name-pipe.module';
import { ProductRatingReviewTableHeadComponent } from './product-rating-review-table-head/product-rating-review-table-head.component';
import { VendorManagementService } from '@app/modules/admin/vendor-management/services/vendor-management.service';



@NgModule({
  declarations: [ProductRatingReviewListItemComponent, ProductRatingReviewTableHeadComponent],
  imports: [
    CommonModule,
    NoImageDirectiveModule,
    SharedViewRatingStarModule,
    SharedPlannerNamePipeModule
  ],
  exports: [ProductRatingReviewListItemComponent, ProductRatingReviewTableHeadComponent],
  providers: [VendorManagementService]
})
export class SharedProductRatingReviewListItemModule { }
