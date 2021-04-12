import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubVendorSignupComponent } from './sub-vendor-signup/sub-vendor-signup.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';

const routes: Routes = [{
  path: '', component: SubVendorSignupComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubVendorSignupRoutingModule { }
