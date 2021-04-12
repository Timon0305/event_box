import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditEventService } from '../../services/add-edit-event/add-edit-event.service';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { isPlanner, compareMomentIsAfter, checkCanEditEvent } from '@app/core/utils/common.util';
import { PlannerManagementService } from '@app/modules/admin/planner-management/services/planner-management.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/internal/operators/map';
import * as moment from 'moment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Constants } from '@app/config/constant';
@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
  providers: [AddEditEventService]
})
export class EventViewComponent implements OnInit, OnDestroy {
  eventDataObservable$;
  dynamicBreadcrumb;
  isPlanner;
  plannerId;
  plannerName;
  destroyed$ = new Subject();
  isUpcomingEvent;
  navigationId;
  timeZoneMap = Constants.TIME_ZONE_DISPLAY_MAP;
  constructor(
    @Inject(DOCUMENT) readonly document: Document,
    @Inject(PLATFORM_ID) readonly platformId: object,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute, private readonly sessionService: SessionManagerService,
    private readonly addEditEventService: AddEditEventService,
    private readonly plannerMgmtService: PlannerManagementService
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      if (this.isPlanner) {
        const divToScroll = this.document.getElementById('dividerToScroll') as HTMLElement;
        divToScroll.scrollIntoView();
      }
    });
    if (this.activatedRoute.snapshot.params.plannerId) {
      this.plannerId = this.activatedRoute.snapshot.params.plannerId;
      this.getPlannerName();
    }
    this.isPlanner = isPlanner(this.sessionService.getRole());
    const eventId = this.activatedRoute.snapshot.params.eventViewId;
    this.eventDataObservable$ = this.addEditEventService.getEventById(eventId).pipe(map(res => {
      if (res.data.endDate) {
        this.isUpcomingEvent = compareMomentIsAfter(res.data.endDate, moment(), 'minute');
        this.getNavigationIdBreadcrumbs();
      }
      return res;
    }));
  }

  getNavigationIdBreadcrumbs() {
    this.navigationId = (this.router.url.indexOf('/planner/event/event-detail/') >= 0) ? (this.isUpcomingEvent ? 1 : 2) : null;
    if (this.isPlanner) {
      this.dynamicBreadcrumb = [BreadCrumb.eventDetail.navigateOptions.find(
        data => data.navigationId === Number((this.activatedRoute.snapshot.queryParams.navigationId || this.navigationId))
      ), BreadCrumb.eventDetail.lastOption];
    } else {
      this.dynamicBreadcrumb = BreadCrumb.adminEventDetails;
    }
  }

  checkCount(questionCounts) {
    return checkCanEditEvent(questionCounts);
  }


  getPlannerName() {
    this.plannerMgmtService.getPlannerName(this.plannerId)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => this.plannerName = res.plannerName);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
