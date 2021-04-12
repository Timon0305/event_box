import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteAnalyticsComponent } from './invite-analytics/invite-analytics.component';


const routes: Routes = [
  {
    path: '',
    component: InviteAnalyticsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitesRoutingModule { }
