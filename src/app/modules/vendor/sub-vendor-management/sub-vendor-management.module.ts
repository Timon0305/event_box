import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroLoaderModule } from '@herodevs/hero-loader';
import { SubVendorManagementRoutingModule } from './sub-vendor-management-routing.module';
import { SubVendorListComponent } from './sub-vendor-list/sub-vendor-list.component';
import { InviteSubVendorComponent } from './invite-sub-vendor/invite-sub-vendor.component';
import { SubVendorStatusComponent } from './sub-vendor-status/sub-vendor-status.component';
import { PaginationModule } from '@app/shared/pagination/pagination.module';


@NgModule({
  declarations: [
    SubVendorListComponent,
    InviteSubVendorComponent,
    SubVendorStatusComponent
  ],
  imports: [
    CommonModule,
    SubVendorManagementRoutingModule,
    NgbModule,
    HeroLoaderModule,
    FormsModule, ReactiveFormsModule,
    PaginationModule
  ],
  entryComponents: [
    InviteSubVendorComponent, SubVendorStatusComponent
  ]
})
export class SubVendorManagementModule { }
