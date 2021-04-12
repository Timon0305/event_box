import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsServicesPurchasedRoutingModule } from './products-services-purchased-routing.module';
import { ProductsServicesPurchasedListComponent } from './products-services-purchased-list/products-services-purchased-list.component';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [ProductsServicesPurchasedListComponent],
  imports: [
    CommonModule,
    ProductsServicesPurchasedRoutingModule,
    SortByFilterModule,
    SharedSearchModule,
    NgbModule,
    NoImageDirectiveModule,
    PaginationModule,
    SharedDateRangeModule,
    BreadcrumbsModule
  ]
})
export class ProductsServicesPurchasedModule { }
