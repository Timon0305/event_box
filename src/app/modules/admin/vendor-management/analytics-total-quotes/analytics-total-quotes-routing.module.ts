import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsTotalQuotesComponent } from './analytics-total-quotes/analytics-total-quotes.component';


const routes: Routes = [
  {
    path: '',
    component: AnalyticsTotalQuotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsTotalQuotesRoutingModule { }
