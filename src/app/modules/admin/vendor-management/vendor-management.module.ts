import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSearchModule } from '@shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@shared/sort-by-filter/sort-by-filter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { VendorManagementRoutingModule } from './vendor-management-routing.module';
import { VendorListComponent } from './vendor-list/vendor-list.component';

import { SharedPhonePipeModule } from '@shared/shared-phone-pipe/shared-phone-pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { UploadLogoModule } from '@app/shared/upload-logo/upload-logo.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
// tslint:disable-next-line:max-line-length
import { SharedProductRatingReviewListItemModule } from '@app/shared/shared-product-rating-review-list-item/shared-product-rating-review-list-item.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AddLocationsModule } from '@app/modules/vendor/profile/add-locations/add-locations.module';
import { PartnerListOpupModule } from '@app/shared/partner-list-opup/partner-list-opup.module';


@NgModule({
  declarations: [VendorListComponent, ViewVendorComponent],
  imports: [
    CommonModule,
    VendorManagementRoutingModule,
    SharedSearchModule,
    SortByFilterModule,
    SharedPhonePipeModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    SharedProductRatingReviewListItemModule,
    NoImageDirectiveModule,
    UploadLogoModule,
    PaginationModule,
    AnalyticsModule,
    AddLocationsModule,
    PartnerListOpupModule
  ]
})
export class VendorManagementModule { }
