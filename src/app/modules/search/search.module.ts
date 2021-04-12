import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { SearchRoutingModule } from './search-routing.module';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { ProductListItemModule } from '@app/shared/product-list-item/product-list-item.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { GoogleAutoCompleteModule } from '../google-auto-complete/google-auto-complete.module';
import { SharedGoogleLocationModule } from '@app/shared/shared-google-location/shared-google-location.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { Ng5SliderModule } from 'ng5-slider';
import { LoginSignupModule } from '../login-signup/login-signup.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [SearchFiltersComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    SearchRoutingModule,
    ProductListItemModule,
    FormsModule,
    ReactiveFormsModule,
    SortByFilterModule,
    NoImageDirectiveModule,
    GoogleAutoCompleteModule,
    SharedGoogleLocationModule,
    BreadcrumbsModule,
    Ng5SliderModule,
    LoginSignupModule,
    FooterModule
  ]
})
export class SearchModule { }
