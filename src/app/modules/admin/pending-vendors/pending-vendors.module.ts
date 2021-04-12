import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingVendorsRoutingModule } from './pending-vendors-routing.module';
import { PendingVendorListComponent } from './pending-vendor-list/pending-vendor-list.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { SharedPhonePipeModule } from '@shared/shared-phone-pipe/shared-phone-pipe.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PendingVendorListComponent],
  imports: [
    CommonModule,
    PendingVendorsRoutingModule,
    SharedSearchModule,
    SharedConfirmationPopupModule,
    SortByFilterModule,
    SharedPhonePipeModule,
    PaginationModule,
    NoImageDirectiveModule,
    NgbModule,
  ]
})
export class PendingVendorsModule { }
