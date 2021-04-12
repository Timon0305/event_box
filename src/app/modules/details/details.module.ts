import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedImageGalleryModule } from '@app/shared/shared-image-gallery/shared-image-gallery.module';
import { HeroLoaderModule } from '@herodevs/hero-loader';
import { SharedVideoListModule } from '@app/shared/shared-video-list/shared-video-list.module';
import { LoginSignupModule } from '../login-signup/login-signup.module';
import { SelectEventPopupComponent } from './select-event-popup/select-event-popup.component';
import { SharedSelectModule } from '@app/shared/shared-select/shared-select.module';
import { VariableInfoPopupModule } from '@app/shared/variable-info-popup/variable-info-popup.module';
import { MessageVendorComponent } from './message-vendor/message-vendor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductListItemModule } from '@app/shared/product-list-item/product-list-item.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { SharedViewRatingStarModule } from '@app/shared/shared-view-rating-star/shared-view-rating-star.module';
import { SharedSlideCarouselModule } from '@app/shared/shared-slide-carousel/shared-slide-carousel.module';
import { VariablePopupOpenService } from './services/variable-popup-open.service';
import {DpDatePickerModule} from 'ng2-date-picker';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [DetailsComponent, SelectEventPopupComponent, MessageVendorComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedImageGalleryModule,
    SharedVideoListModule,
    HeroLoaderModule,
    LoginSignupModule,
    SharedSelectModule,
    VariableInfoPopupModule,
    ReactiveFormsModule, FormsModule,
    ProductListItemModule,
    NoImageDirectiveModule,
    BreadcrumbsModule,
    SharedViewRatingStarModule,
    SharedSlideCarouselModule,
    DpDatePickerModule,
    NgSelectModule
  ],
  entryComponents: [SelectEventPopupComponent],
  providers: [VariablePopupOpenService]
})
export class DetailsModule { }
