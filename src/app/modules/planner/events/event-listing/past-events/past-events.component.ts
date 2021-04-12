import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { AddEditEventService } from '../../services/add-edit-event/add-edit-event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { checkCanEditEvent, changeQueryParams, getDatetoISOFormat } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { SharedDateRangeComponent } from '@app/shared/shared-date-range/shared-date-range/shared-date-range.component';
import { ExportService } from '@app/core/services/common/export.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.scss'],
  providers: [AddEditEventService]
})
export class PastEventsComponent implements OnInit, OnDestroy {
  @Input() pastEventObservable;
  @Output() updatePage = new EventEmitter();
  @Input() paramsLength;
  @Input() isPlanner;
  pastEventObservable$;
  destroyed$ = new Subject();
  @ViewChild(SharedDateRangeComponent, { static: false }) dateRangeComponent: SharedDateRangeComponent;
  adminEventsRoute = Constants.APPLICATION_ROUTES.admin.events;
  plannerId;
  awaitingQuoteRoute = Constants.APPLICATION_ROUTES.planner.reltaiveQuoteRoute.awaitingQuotes;
  timeZoneMap = Constants.TIME_ZONE_DISPLAY_MAP;
  constructor(
    private readonly router: Router, private readonly route: ActivatedRoute,
    private readonly eventService: AddEditEventService,
    private readonly exportService: ExportService) { }

  ngOnInit() {
    this.plannerId = this.route.snapshot.params.plannerId;
  }
  pageChange(page) {
    this.updatePage.emit({ page });
  }

  checkQuesCount(questionCounts) {
    return checkCanEditEvent(questionCounts);
  }

  updateQueryParameters(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  searchPastEvents(filter) {
    let searchPayload: { [index: string]: string | null } = {
      filter: null,
      fields: null
    };
    if (filter) {
      searchPayload = { ...searchPayload, filter };
    }
    this.updateQueryParameters(searchPayload);
  }

  navigateAdminViewEvent(eventId) {
    this.eventService.adminViewEventDetail(eventId);
  }

  plannerViewEvent(eventId) {
    this.eventService.plnnerViewEventDetails(eventId, { navigationId: 2 });
  }
  navigateAdminPlannerEvent(eventId) {
    this.router.navigate([`${eventId}/awaiting-vendor-quotes/list`], {relativeTo: this.route});
  }

  fetchReport() {
    let reportParams;
    reportParams = {
      ...(this.dateRangeComponent ?
        this.dateRangeComponent.getDateFromDateTo() :
        null),
      exportType: Constants.EXPORTS_DATA.events.exportType,
      type: Constants.EXPORTS_DATA.events.past
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

  // navigateAdminViewPlannerEvent(){
  //   this.eventService.adminViewEventDetail(eventId);
  // }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
