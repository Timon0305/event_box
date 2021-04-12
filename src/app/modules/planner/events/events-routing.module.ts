import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [
  {
    path: 'list',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER],
    },
    loadChildren: () => import('@modules/planner/events/event-listing/event-listing.module')
      .then(m => m.EventListingModule)
  }, {
    path: 'add-event',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER],
    },
    loadChildren: () => import('@modules/planner/events/add-event/add-event.module')
      .then(m => m.AddEventModule)
  }, {
    path: 'edit-event/:eventId',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER],
    },
    loadChildren: () => import('@modules/planner/events/add-event/add-event.module')
      .then(m => m.AddEventModule)
  }, {
    path: 'duplicate-event/:duplicateEventId',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER],
    },
    loadChildren: () => import('@modules/planner/events/add-event/add-event.module')
      .then(m => m.AddEventModule)
  }, {
    path: 'event-detail/:eventViewId',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER],
    },
    loadChildren: () => import('@modules/planner/events/event-view/event-view.module')
      .then(m => m.EventViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
