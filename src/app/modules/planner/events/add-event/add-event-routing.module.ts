import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';



const routes: Routes = [
  {
    path: '',
    component: AddEditEventComponent,
    // data: {
    //   breadcrumb: BreadCrumb.plannerAddCreditCard
    // }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEventRoutingModule { }
