import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptVendorRoutingModule } from './accept-vendor-routing.module';
import { AcceptVendorComponent } from './accept-vendor/accept-vendor.component';
// import { SharedDateTimepickerModule } from '@app/shared/shared-date-timepicker/shared-date-timepicker.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { DpDatePickerModule } from 'ng2-date-picker';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [AcceptVendorComponent],
  imports: [
    CommonModule,
    AcceptVendorRoutingModule,
    // SharedDateTimepickerModule,
    FormsModule, ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    DpDatePickerModule,
    BreadcrumbsModule
  ],
  exports: [AcceptVendorComponent]
})
export class AcceptVendorModule { }
