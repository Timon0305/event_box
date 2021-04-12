import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlannerListComponent } from './planner-list/planner-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';

const routes: Routes = [
  {
    path: '', component: PlannerListComponent
  },
  {
    path: 'view/:plannerId',
    loadChildren: () => import('@modules/planner-analytics/planner-analytics.module').then(m => m.PlannerAnalyticsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerManagementRoutingModule { }
