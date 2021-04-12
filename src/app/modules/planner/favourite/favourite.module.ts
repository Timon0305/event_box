import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouriteRoutingModule } from './favourite-routing.module';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { SharedViewRatingStarModule } from '@app/shared/shared-view-rating-star/shared-view-rating-star.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';


@NgModule({
  declarations: [FavouriteListComponent],
  imports: [
    CommonModule,
    FavouriteRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    SharedSearchModule,
    SortByFilterModule,
    NgSelectModule,
    NoImageDirectiveModule,
    SharedConfirmationPopupModule,
    SharedViewRatingStarModule,
    PaginationModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FavouriteModule { }
