import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRatingReviewPopupComponent } from './shared-rating-review-popup/shared-rating-review-popup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SharedRatingReviewPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [SharedRatingReviewPopupComponent],
  exports: [SharedRatingReviewPopupComponent]
})
export class SharedRatingReviewPopupModule { }
