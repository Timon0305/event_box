import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlannerDashboardComponent } from './planner-dashboard/planner-dashboard.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [
  {
    path: '',
    component: PlannerDashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerDashboardRoutingModule { }
