import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { ViewAllProductRatingReviewListComponent } from './view-all-product-rating-review-list/view-all-product-rating-review-list.component';
import { Constants } from '@app/config/constant';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';


const routes: Routes = [{
  path: '',
  component: ViewAllProductRatingReviewListComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllProductRatingReviewListRoutingModule { }
