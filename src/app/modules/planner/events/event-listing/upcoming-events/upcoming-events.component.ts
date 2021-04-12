import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { AddEditEventService } from '../../services/add-edit-event/add-edit-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { checkCanEditEvent, changeQueryParams, getDatetoISOFormat } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { ExportService } from '@app/core/services/common/export.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
  providers: [AddEditEventService]
})
export class UpcomingEventsComponent implements OnInit, OnDestroy {
  @Input() upcomingEvents;
  @Input() paramsLength = 0;
  @Output() updatePage = new EventEmitter();
  @Input() isPlanner;
  @ViewChild(SharedDateRangeComponent, { static: false }) dateRangeComponent: SharedDateRangeComponent;
  adminEventsRoute = Constants.APPLICATION_ROUTES.admin.events;
  destroyed$ = new Subject();
  plannerId;
  timeZoneMap = Constants.TIME_ZONE_DISPLAY_MAP;
  constructor(
    private readonly router: Router, private readonly eventService: AddEditEventService,
    private readonly route: ActivatedRoute, private readonly exportService: ExportService
  ) { }

  ngOnInit() {
    this.plannerId = this.route.snapshot.params.plannerId;
  }

  pageChange(page) {
    this.updatePage.emit({ page });
  }

  editEvent(eventId) {
    this.router.navigate([`${'/planner/event/edit-event'}/${eventId}`]);
  }

  duplicateEvent(eventId) {
    this.router.navigate([`${'/planner/event/duplicate-event'}/${eventId}`]);
  }

  checkCount(questionCounts) {
    return checkCanEditEvent(questionCounts);
  }

  updateQueryParameters(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  search(filter) {
    let searchPayload: { [index: string]: string | null } = {
      filter: null,
      fields: null
    };
    if (filter) {
      searchPayload = { ...searchPayload, filter };
    }
    this.updateQueryParameters({ ...searchPayload, page: 1 });

  }

  navigateAdminViewEvent(eventId) {
    this.eventService.adminViewEventDetail(eventId);
  }

  plannerViewEvent(eventId) {
    this.eventService.plnnerViewEventDetails(eventId, { navigationId: 1 });
  }

  fetchReport() {
    let reportParams;
    reportParams = {
      ...(this.dateRangeComponent ?
        this.dateRangeComponent.getDateFromDateTo() :
        null),
      exportType: Constants.EXPORTS_DATA.events.exportType,
      type: Constants.EXPORTS_DATA.events.upcoming
    };
    if (this.route.snapshot.params.plannerId) {
      reportParams = {
        ...reportParams,
        role: Constants.Role.PLANNER,
        id: this.route.snapshot.params.plannerId
      };
    }
    if (reportParams.dateFrom && reportParams.dateTo) {
      reportParams = getDatetoISOFormat(Constants.DATE_RANGE_FIELDS, { ...reportParams });
    }
    this.exportService.export(reportParams).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      if (this.dateRangeComponent) {
        this.dateRangeComponent.clearDate();
      }
    });
  }

  navigateAdminPlannerEvent(eventId) {
    this.router.navigate([`${eventId}/awaiting-vendor-quotes/list`], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
