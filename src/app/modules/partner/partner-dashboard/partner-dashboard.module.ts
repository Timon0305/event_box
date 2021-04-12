import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerDashboardRoutingModule } from './partner-dashboard-routing.module';
import { PartnerAnalyticsComponent } from './partner-analytics/partner-analytics.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PartnerViewProfileModule } from '@modules/partner/partner-view-profile/partner-view-profile.module';
import { SharedDateFilterModule } from '@app/shared/shared-date-filter/shared-date-filter.module';


@NgModule({
  declarations: [PartnerAnalyticsComponent],
  imports: [
    CommonModule,
    PartnerDashboardRoutingModule,
    NgSelectModule, PartnerViewProfileModule,
    SharedDateFilterModule
  ]
})
export class PartnerDashboardModule { }
