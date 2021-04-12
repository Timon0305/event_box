import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDashboardRoutingModule } from './vendor-dashboard-routing.module';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { DetectNumberSignModule } from '@app/shared/detect-number-sign/detect-number-sign.module';


@NgModule({
  declarations: [VendorDashboardComponent],
  imports: [
    CommonModule,
    VendorDashboardRoutingModule,
    DetectNumberSignModule
  ]
})
export class VendorDashboardModule { }
