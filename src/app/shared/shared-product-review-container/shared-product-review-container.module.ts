import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductReviewContainerComponent } from './product-review-container/product-review-container.component';
import { NoImageDirectiveModule } from '../no-image-directive/no-image-directive.module';
import { SharedViewRatingStarModule } from '../shared-view-rating-star/shared-view-rating-star.module';



@NgModule({
  declarations: [ProductReviewContainerComponent],
  imports: [
    CommonModule,
    NoImageDirectiveModule,
    SharedViewRatingStarModule
  ],
  exports: [ ProductReviewContainerComponent]
})
export class SharedProductReviewContainerModule { }
