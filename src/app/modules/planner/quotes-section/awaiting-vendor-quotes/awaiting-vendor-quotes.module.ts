import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwaitingVendorQuotesRoutingModule } from './awaiting-vendor-quotes-routing.module';
import { AwaitingVendorQuotesListComponent } from './awaiting-vendor-quotes-list/awaiting-vendor-quotes-list.component';
import { AwaitingVendorQuotesTableComponent } from './awaiting-vendor-quotes-table/awaiting-vendor-quotes-table.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';


@NgModule({
  declarations: [
    AwaitingVendorQuotesListComponent, AwaitingVendorQuotesTableComponent
  ],
  imports: [
    CommonModule,
    AwaitingVendorQuotesRoutingModule,
    SharedSearchModule,
    NgSelectModule,
    NgbModule,
    SharedPhonePipeModule,
    SortByFilterModule,
    PaginationModule,
    SharedDateRangeModule
  ]
})
export class AwaitingVendorQuotesModule { }
