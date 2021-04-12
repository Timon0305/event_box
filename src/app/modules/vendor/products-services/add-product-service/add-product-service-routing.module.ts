import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductServiceComponent } from './add-product-service/add-product-service.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: AddProductServiceComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.VENDOR],
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProductServiceRoutingModule { }
