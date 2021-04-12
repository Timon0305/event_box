import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlannerRoutingModule } from './planner-routing.module';
import { SharedProfileViewModule } from '@app/shared/shared-profile-view/shared-profile-view.module';

import { PlannerSidebarComponent } from './planner-sidebar/planner-sidebar.component';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [PlannerSidebarComponent],
  imports: [
    CommonModule,
    PlannerRoutingModule,
    SharedProfileViewModule,
    BreadcrumbsModule,
    NgbModule
  ]
})
export class PlannerModule { }
