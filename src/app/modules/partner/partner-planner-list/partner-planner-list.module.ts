import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerPlannerListRoutingModule } from './partner-planner-list-routing.module';
import { PartnerPlannerListComponent } from './partner-planner-list/partner-planner-list.component';
import { PartnerPlannerTableComponent } from './partner-planner-table/partner-planner-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { PartnerListService } from '@app/modules/admin/partner-list/partner-list.service';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { PartnerListOpupModule } from '@app/shared/partner-list-opup/partner-list-opup.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';


@NgModule({
  declarations: [PartnerPlannerListComponent, PartnerPlannerTableComponent],
  imports: [
    CommonModule,
    PartnerPlannerListRoutingModule,
    NgbModule,
    NoImageDirectiveModule,
    SharedSearchModule,
    SharedPhonePipeModule,
    PaginationModule,
    PartnerListOpupModule,
    SortByFilterModule
  ], providers: [PartnerListService],
  exports: [ PartnerPlannerListComponent, PartnerPlannerTableComponent ]
})
export class PartnerPlannerListModule { }
