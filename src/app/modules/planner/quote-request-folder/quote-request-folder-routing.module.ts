import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteRequestListComponent } from './quote-request-list/quote-request-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: QuoteRequestListComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.PLANNER],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRequestFolderRoutingModule { }
