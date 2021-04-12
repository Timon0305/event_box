import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventViewComponent } from './event-view/event-view.component';


const routes: Routes = [{
  path: '',
  component: EventViewComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('@modules/planner/quotes-section/quotes-section.module')
        .then(m => m.QuotesSectionModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventViewRoutingModule { }
