import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotesListingComponent } from './quotes-listing/quotes-listing.component';


const routes: Routes = [
  {
    path: '',
    component: QuotesListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesListingRoutingModule { }
