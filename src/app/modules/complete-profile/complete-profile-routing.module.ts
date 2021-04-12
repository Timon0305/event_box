import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailTypeComponent } from './detail-type/detail-type.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { VendorBankDetailComponent } from './vendor-bank-detail/vendor-bank-detail.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: DetailTypeComponent,
  children: [{
    path: 'vendor-detail',
    component: VendorDetailComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR]
    }
  }, {
    path: 'bank-detail',
    component: VendorBankDetailComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR]
    }
  }]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteProfileRoutingModule { }
