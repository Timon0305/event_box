import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { CompleteProfileModule } from '@app/modules/complete-profile/complete-profile.module';
import { ProfileService } from './service/profile.service';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { NgxMaskModule } from 'ngx-mask';
import { CompanyLocationViewComponent } from './company-location-view/company-location-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewBankDetailsComponent } from './view-bank-details/view-bank-details.component';
import { UploadLogoModule } from '@app/shared/upload-logo/upload-logo.module';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { SharedProfileViewModule } from '@app/shared/shared-profile-view/shared-profile-view.module';
// tslint:disable-next-line: max-line-length
import { SharedProductRatingReviewListItemModule } from '@app/shared/shared-product-rating-review-list-item/shared-product-rating-review-list-item.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AddLocationsModule } from './add-locations/add-locations.module';



@NgModule({
  declarations: [ProfileComponent, ProfileViewComponent,
    CompanyLocationViewComponent, ViewBankDetailsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CompleteProfileModule,
    NgxMaskModule.forRoot(),
    UploadLogoModule,
    SharedConfirmationPopupModule,
    SharedProfileViewModule,
    NgbModule,
    SharedProductRatingReviewListItemModule,
    SharedSearchModule,
    SortByFilterModule,
    PaginationModule,
    AddLocationsModule,
  ], providers: [ProfileService]
})
export class ProfileModule { }
