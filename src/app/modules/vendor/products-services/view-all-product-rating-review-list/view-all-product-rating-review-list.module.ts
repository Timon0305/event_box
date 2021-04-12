import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAllProductRatingReviewListRoutingModule } from './view-all-product-rating-review-list-routing.module';
// tslint:disable-next-line: max-line-length
import { ViewAllProductRatingReviewListComponent } from './view-all-product-rating-review-list/view-all-product-rating-review-list.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { SharedViewRatingStarModule } from '@app/shared/shared-view-rating-star/shared-view-rating-star.module';
import { SharedPlannerNamePipeModule } from '@app/shared/shared-planner-name-pipe/shared-planner-name-pipe.module';
import { SharedProductReviewContainerModule } from '@app/shared/shared-product-review-container/shared-product-review-container.module';
// tslint:disable-next-line: max-line-length
import { SharedProductRatingReviewListItemModule } from '@app/shared/shared-product-rating-review-list-item/shared-product-rating-review-list-item.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';

@NgModule({
  declarations: [ViewAllProductRatingReviewListComponent],
  imports: [
    CommonModule,
    NgbModule,
    ViewAllProductRatingReviewListRoutingModule,
    SharedSearchModule,
    SortByFilterModule,
    BreadcrumbsModule,
    NoImageDirectiveModule,
    SharedViewRatingStarModule,
    SharedPlannerNamePipeModule,
    SharedProductReviewContainerModule,
    SharedProductRatingReviewListItemModule,
    PaginationModule
  ]
})
export class ViewAllProductRatingReviewListModule { }
