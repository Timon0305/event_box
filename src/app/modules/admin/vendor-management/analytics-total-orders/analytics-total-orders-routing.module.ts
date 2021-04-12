import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsTotalOrdersComponent } from './analytics-total-orders/analytics-total-orders.component';


const routes: Routes = [
  {
    path: '',
    component: AnalyticsTotalOrdersComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsTotalOrdersRoutingModule { }
