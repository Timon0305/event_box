import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProductServiceComponent } from './view-product-service/view-product-service.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: ViewProductServiceComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR, Constants.Role.ADMIN],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProductServiceRoutingModule { }
