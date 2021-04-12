import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPartnerProfileComponent } from './add-partner-profile/add-partner-profile.component';
import { AddBasicDetailsComponent } from './add-basic-details/add-basic-details.component';
import { AddPartnerBankDetailsComponent } from './add-partner-bank-details/add-partner-bank-details.component';
import { AddCommissionDetailsComponent } from './add-commission-details/add-commission-details.component';

const routes: Routes = [{
  path: '',
  component: AddPartnerProfileComponent,
  children: [
    {
      path: '',
      component: AddBasicDetailsComponent
    },
    {
      path: 'commission-details/:partnerId',
      component: AddCommissionDetailsComponent
    },
    {
      path: 'bank-details/:partnerId',
      component: AddPartnerBankDetailsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerAddProfileRoutingModule { }
