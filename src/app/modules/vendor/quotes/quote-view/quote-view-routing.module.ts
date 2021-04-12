import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteViewComponent } from './quote-view/quote-view.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';

const routes: Routes = [ {
  path: '',
  component: QuoteViewComponent,
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR, Constants.Role.ADMIN, Constants.Role.PARTNER],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteViewRoutingModule { }
