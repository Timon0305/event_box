import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AwaitingVendorQuotesListComponent } from './awaiting-vendor-quotes-list/awaiting-vendor-quotes-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';

const routes: Routes = [
  {
    path: 'list',
    component: AwaitingVendorQuotesListComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER, Constants.Role.ADMIN],
    },
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwaitingVendorQuotesRoutingModule { }
