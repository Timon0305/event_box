import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ChangePasswordFormComponent} from '@modules/change-password-form/change-password-form/change-password-form.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: ChangePasswordFormComponent,
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordFormRoutingModule { }
