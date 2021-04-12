import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlannerDashboardRoutingModule } from './planner-dashboard-routing.module';
import { PlannerDashboardComponent } from './planner-dashboard/planner-dashboard.component';


@NgModule({
  declarations: [PlannerDashboardComponent],
  imports: [
    CommonModule,
    PlannerDashboardRoutingModule
  ]
})
export class PlannerDashboardModule { }
