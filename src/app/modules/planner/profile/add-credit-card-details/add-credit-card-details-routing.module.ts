import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCreditCardDetailsComponent } from './add-credit-card-details/add-credit-card-details.component';
import { BreadCrumb } from '@app/config/breadcrumbs';



const routes: Routes = [
  {
    path: '',
    component: AddCreditCardDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCreditCardDetailsRoutingModule { }
