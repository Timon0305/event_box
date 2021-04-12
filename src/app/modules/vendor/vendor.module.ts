import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VendorSideBarComponent } from './vendor-side-bar/vendor-side-bar.component';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { PaySetupSubscriptionFeesModule } from './pay-setup-subscription-fees/pay-setup-subscription-fees.module';



@NgModule({
  declarations: [VendorSideBarComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    NgbModule,
    BreadcrumbsModule,
    PaySetupSubscriptionFeesModule
  ]
})
export class VendorModule { }
