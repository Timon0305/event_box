import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerListRoutingModule } from './partner-list-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerTableComponent } from './partner-table/partner-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PartnerListService } from './partner-list.service';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { FormatDatePipeModule } from '@shared/pipes/format-date-pipe/format-date-pipe.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';


@NgModule({
  declarations: [PartnerListComponent, PartnerTableComponent],
  imports: [
    CommonModule,
    PartnerListRoutingModule,
    NgSelectModule,
    SharedPhonePipeModule,
    FormatDatePipeModule,
    PaginationModule,
    SharedSearchModule,
    SortByFilterModule,
    SharedConfirmationPopupModule
  ], providers: [PartnerListService]
})
export class PartnerListModule { }
