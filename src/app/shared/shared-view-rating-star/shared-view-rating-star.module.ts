import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedViewRatingStarComponent } from './shared-view-rating-star/shared-view-rating-star.component';



@NgModule({
  declarations: [SharedViewRatingStarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [SharedViewRatingStarComponent],
  exports: [SharedViewRatingStarComponent]
})
export class SharedViewRatingStarModule { }
