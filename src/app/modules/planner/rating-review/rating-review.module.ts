import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingReviewRoutingModule } from './rating-review-routing.module';
import { RatingReviewListComponent } from './rating-review-list/rating-review-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { SharedCancelRejectPopupModule } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup.module';
import { ViewRatingReviewComponent } from './view-rating-review/view-rating-review.component';
import { SharedRatingReviewPopupModule } from '@app/shared/shared-rating-review-popup/shared-rating-review-popup.module';
import { SharedViewRatingStarModule } from '@app/shared/shared-view-rating-star/shared-view-rating-star.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';


@NgModule({
  declarations: [RatingReviewListComponent, ViewRatingReviewComponent],
  imports: [
    CommonModule,
    RatingReviewRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    SharedSearchModule,
    SortByFilterModule,
    NgSelectModule,
    NoImageDirectiveModule,
    SharedConfirmationPopupModule,
    SharedCancelRejectPopupModule,
    SharedRatingReviewPopupModule,
    SharedViewRatingStarModule,
    PaginationModule
  ],
  entryComponents: [ViewRatingReviewComponent]
})
export class RatingReviewModule { }
