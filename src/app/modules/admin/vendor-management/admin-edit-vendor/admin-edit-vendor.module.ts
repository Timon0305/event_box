import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEditVendorRoutingModule } from './admin-edit-vendor-routing.module';
import { AdminEditVendorComponent } from './admin-edit-vendor/admin-edit-vendor.component';
import { VendorProfileFormModule } from '@app/shared/vendor-profile-form/vendor-profile-form.module';
import { AcceptVendorModule } from '../accept-vendor/accept-vendor.module';


@NgModule({
  declarations: [AdminEditVendorComponent],
  imports: [
    CommonModule,
    AdminEditVendorRoutingModule,
    VendorProfileFormModule,
    AcceptVendorModule
  ]
})
export class AdminEditVendorModule { }
