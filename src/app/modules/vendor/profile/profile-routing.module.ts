import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { VendorBankDetailComponent } from '@app/modules/complete-profile/vendor-bank-detail/vendor-bank-detail.component';
import { ProfileFormComponent } from '@app/modules/complete-profile/profile-form/profile-form.component';

import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR],
    }
  },
  {
    path: 'bank-details',
    component: VendorBankDetailComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR],
      breadcrumb: [{
        text: 'Profile',
        route: Constants.APPLICATION_ROUTES.vendor.profile
      },
      {
        text: 'Bank Details',
        route: Constants.APPLICATION_ROUTES.vendor.bankDetails
      }]
    }
  },
  {
    path: 'edit-profile',
    component: ProfileFormComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR],
      breadcrumb: [{
        text: 'Profile',
        route: Constants.APPLICATION_ROUTES.vendor.profile
      }, {
        text: 'Edit Profile',
        route: Constants.APPLICATION_ROUTES.vendor.editProfile
      }]
    }
  },
  {
    path: 'my-product-rating-review',
    loadChildren: () => import('@modules/vendor/profile/myall-product-rating-review-list/myall-product-rating-review-list.module').
    then(m => m.MyallProductRatingReviewListModule),
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR],
      breadcrumb: [{
        text: 'Profile',
        route: Constants.APPLICATION_ROUTES.vendor.profile
      },
      {
        text: 'Ratings & Reviews',
        route: ''
      }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
