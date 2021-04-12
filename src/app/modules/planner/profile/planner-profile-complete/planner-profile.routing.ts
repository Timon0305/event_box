import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlannerProfileCompleteComponent } from './planner-profile-complete/planner-profile-complete.component';
import { BreadCrumb } from '@app/config/breadcrumbs';


const routes: Routes = [
  {
    path: '',
    component: PlannerProfileCompleteComponent,
    data: {
      breadcrumb: BreadCrumb.plannerEditProfile
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerProfileRoutingModule { }
