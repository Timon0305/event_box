import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAnalyticsComponent } from './partner-analytics/partner-analytics.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: PartnerAnalyticsComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.PARTNER, Constants.Role.ADMIN],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerDashboardRoutingModule { }
