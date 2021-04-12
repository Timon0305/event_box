import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpiredCancelledListingComponent } from './expired-cancelled-listing/expired-cancelled-listing.component';

const routes: Routes = [
  {
    path: '',
    component: ExpiredCancelledListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesExpiredListingRoutingModule { }
