import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { EventListingRoutingModule } from './event-listing-routing.module';
import { EventListingComponent } from './event-listing/event-listing.component';
import { NgxMaskModule } from 'ngx-mask';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { PastEventsComponent } from './past-events/past-events.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EventFilterComponent } from './event-filter/event-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedDateRangeModule } from '@app/shared/shared-date-range/shared-date-range.module';
import { TimezoneDateFormatModule } from '@app/shared/pipes/timezone-date-format/timezone-date-format.module';






@NgModule({
  declarations: [EventListingComponent, UpcomingEventsComponent, PastEventsComponent, EventFilterComponent],
  imports: [
    CommonModule,
    EventListingRoutingModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    SharedSearchModule,
    BreadcrumbsModule,
    SortByFilterModule,
    PaginationModule,
    SharedDateRangeModule,
    TimezoneDateFormatModule
  ]
})
export class EventListingModule { }
