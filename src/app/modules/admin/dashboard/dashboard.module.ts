import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'chart.js';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedDateFilterModule } from '@app/shared/shared-date-filter/shared-date-filter.module';
import { MembersComponent } from './members/members.component';
import { MembersSectionComponent } from './members-section/members-section.component';
import { CategoriesSalesComponent } from './categories-sales/categories-sales.component';
import { TopSellersComponent } from './top-sellers/top-sellers.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { GraphComponent } from './graph/graph.component';
import { ChartsModule } from 'ng2-charts';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';
import { TimezoneDateFormatModule } from '@app/shared/pipes/timezone-date-format/timezone-date-format.module';


@NgModule({
  declarations: [
    DashboardComponent, MembersComponent, MembersSectionComponent, CategoriesSalesComponent,
     TopSellersComponent, NewOrdersComponent, GraphComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedDateFilterModule,
    ChartsModule,
    SharedDateRangeModule,
    TimezoneDateFormatModule
  ]
})
export class DashboardModule { }
