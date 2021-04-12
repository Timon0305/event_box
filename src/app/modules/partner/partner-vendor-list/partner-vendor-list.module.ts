import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerVendorListRoutingModule } from './partner-vendor-list-routing.module';
import { PartnerVendorListComponent } from './partner-vendor-list/partner-vendor-list.component';
import { PartnerVendorTableComponent } from './partner-vendor-table/partner-vendor-table.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { PartnerListService } from '@app/modules/admin/partner-list/partner-list.service';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { PartnerListOpupModule } from '@app/shared/partner-list-opup/partner-list-opup.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';


@NgModule({
  declarations: [PartnerVendorListComponent, PartnerVendorTableComponent],
  imports: [
    CommonModule,
    PartnerVendorListRoutingModule,
    SharedSearchModule,
    NoImageDirectiveModule,
    SharedPhonePipeModule,
    PaginationModule,
    PartnerListOpupModule,
    SortByFilterModule
  ], providers: [PartnerListService],
})
export class PartnerVendorListModule { }
