import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSlideCarouselComponent } from './shared-slide-carousel/shared-slide-carousel.component';
import { SharedViewRatingStarModule } from '../shared-view-rating-star/shared-view-rating-star.module';
import { NoImageDirectiveModule } from '../no-image-directive/no-image-directive.module';
import { SharedPlannerNamePipeModule } from '../shared-planner-name-pipe/shared-planner-name-pipe.module';



@NgModule({
  declarations: [SharedSlideCarouselComponent],
  imports: [
    CommonModule,
    SharedViewRatingStarModule,
    NoImageDirectiveModule,
    SharedPlannerNamePipeModule
  ], exports: [SharedSlideCarouselComponent]
})
export class SharedSlideCarouselModule { }
