import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingReviewListComponent } from './rating-review-list/rating-review-list.component';


const routes: Routes = [{
  path: '',
  component: RatingReviewListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingReviewRoutingModule { }
