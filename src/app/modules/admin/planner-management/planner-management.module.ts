import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSearchModule } from '@shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@shared/sort-by-filter/sort-by-filter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PlannerManagementRoutingModule } from './planner-management-routing.module';
import { PlannerListComponent } from './planner-list/planner-list.component';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { PartnerListOpupModule } from '@app/shared/partner-list-opup/partner-list-opup.module';

@NgModule({
  declarations: [PlannerListComponent],
  imports: [
    CommonModule,
    PlannerManagementRoutingModule,
    SharedSearchModule,
    SortByFilterModule,
    NgbModule,
    SharedPhonePipeModule,
    NgbModule,
    NgSelectModule,
    SharedConfirmationPopupModule,
    PaginationModule,
    PartnerListOpupModule
  ]
})
export class PlannerManagementModule { }
