import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyallProductRatingReviewListComponent } from './myall-product-rating-review-list/myall-product-rating-review-list.component';


const routes: Routes = [
  {
    path: '',
    component: MyallProductRatingReviewListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyallProductRatingReviewListRoutingModule { }
