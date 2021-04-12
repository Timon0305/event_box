import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { ViewAllProductsServicesRoutingModule } from './view-all-products-services-routing.module';
import { ProductsServicesListComponent } from './products-services-list/products-services-list.component';
import { ProductServicesFiltersComponent } from './product-services-filters/product-services-filters.component';
import { ProductServiceTableComponent } from './product-service-table/product-service-table.component';

// Shared modules
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';



@NgModule({
  declarations: [ProductsServicesListComponent, ProductServicesFiltersComponent, ProductServiceTableComponent],
  imports: [
    CommonModule,
    ViewAllProductsServicesRoutingModule,
    NgSelectModule,
    NgbModule,
    SharedSearchModule,
    ReactiveFormsModule, FormsModule,
    SharedConfirmationPopupModule,
    SortByFilterModule,
    BreadcrumbsModule,
    PaginationModule
  ]
})
export class ViewAllProductsServicesModule { }
