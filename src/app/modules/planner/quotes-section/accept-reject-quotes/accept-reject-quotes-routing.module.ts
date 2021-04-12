import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptRejectQuotesListComponent } from './accept-reject-quotes-list/accept-reject-quotes-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [
  {
    path: 'list',
    component: AcceptRejectQuotesListComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN],
    },
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptRejectQuotesRoutingModule { }
