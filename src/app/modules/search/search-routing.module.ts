import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchFiltersComponent} from '@modules/search/search-filters/search-filters.component';


const routes: Routes = [{
  path: '',
  component: SearchFiltersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
