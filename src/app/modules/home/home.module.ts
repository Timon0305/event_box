import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroLoaderModule } from '@herodevs/hero-loader';
import { ProductListItemModule } from '@app/shared/product-list-item/product-list-item.module';
import { HomeSearchComponent } from './home-search/home-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSignupService } from '../login-signup/services/login-signup.service';
import { SharedGoogleLocationModule } from '@app/shared/shared-google-location/shared-google-location.module';
import { SharedProductSearchModule } from '@app/shared/shared-product-search/shared-product-search.module';
import { SharedSlideCarouselModule } from '@app/shared/shared-slide-carousel/shared-slide-carousel.module';



@NgModule({
  declarations: [HomeComponent, HomeSearchComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    HeroLoaderModule,
    ProductListItemModule,
    FormsModule,
    ReactiveFormsModule,
    SharedGoogleLocationModule,
    SharedProductSearchModule,
    SharedSlideCarouselModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
 providers : [LoginSignupService]
})
export class HomeModule { }
