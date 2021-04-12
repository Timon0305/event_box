import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProductServiceRoutingModule } from './view-product-service-routing.module';
import { ViewProductServiceComponent } from './view-product-service/view-product-service.component';
import { SharedSlideCarouselModule } from '@app/shared/shared-slide-carousel/shared-slide-carousel.module';
import { SharedImageGalleryModule } from '@app/shared/shared-image-gallery/shared-image-gallery.module';
import { SharedVideoListModule } from '@app/shared/shared-video-list/shared-video-list.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedViewRatingStarModule } from '@app/shared/shared-view-rating-star/shared-view-rating-star.module';
import { SharedPlannerNamePipeModule } from '@app/shared/shared-planner-name-pipe/shared-planner-name-pipe.module';

@NgModule({
  declarations: [ViewProductServiceComponent],
  imports: [
    CommonModule,
    ViewProductServiceRoutingModule,
    SharedSlideCarouselModule,
    SharedImageGalleryModule,
    SharedVideoListModule,
    BreadcrumbsModule,
    SharedConfirmationPopupModule,
    SharedViewRatingStarModule,
    SharedPlannerNamePipeModule,
    NgbModule
  ]
})
export class ViewProductServiceModule { }
