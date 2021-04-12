import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitesRoutingModule } from './invites-routing.module';
import { InviteAnalyticsComponent } from './invite-analytics/invite-analytics.component';
import { PartnerPlannerListModule } from '@app/modules/partner/partner-planner-list/partner-planner-list.module';


@NgModule({
  declarations: [InviteAnalyticsComponent],
  imports: [
    CommonModule,
    InvitesRoutingModule,
    PartnerPlannerListModule
  ]
})
export class InvitesModule { }
