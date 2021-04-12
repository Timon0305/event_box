import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlProfileViewComponent } from './pl-profile-view/pl-profile-view.component';


const routes: Routes = [
  {
    path: '',
    component: PlProfileViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlProfileViewRoutingModule { }
