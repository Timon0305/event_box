import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoImageDirectiveModule } from '../no-image-directive/no-image-directive.module';
import { LoginSignupModule } from '@app/modules/login-signup/login-signup.module';
import { SharedConfirmationPopupModule } from '../shared-confirmation-popup/shared-confirmation-popup.module';
import { SharedViewRatingStarModule } from '../shared-view-rating-star/shared-view-rating-star.module';
import { PriceContainerModule } from '../directives/price-container/price-container.module';



@NgModule({
  declarations: [ProductItemComponent],
  imports: [
    CommonModule,
    NgbModule,
    NoImageDirectiveModule,
    LoginSignupModule,
    SharedConfirmationPopupModule,
    SharedViewRatingStarModule,
    PriceContainerModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ], exports: [ProductItemComponent]
})
export class ProductListItemModule { }
