import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerPlannerListComponent } from './partner-planner-list/partner-planner-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: PartnerPlannerListComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.PARTNER, Constants.Role.ADMIN, Constants.Role.VENDOR],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerPlannerListRoutingModule { }
