import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteRequestDetailComponent } from './quote-request-detail/quote-request-detail.component';
import { BreadCrumb } from '@app/config/breadcrumbs';


const routes: Routes = [{
  path: '',
  component: QuoteRequestDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRequestDetailRoutingModule { }
