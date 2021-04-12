import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddEditEventService } from '../../services/add-edit-event/add-edit-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/config/constant';
import { changeQueryParams, isPlanner, CheckRoles } from '@app/core/utils/common.util';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { PlannerManagementService } from '@app/modules/admin/planner-management/services/planner-management.service';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss'],
  providers: [AddEditEventService]
})
export class EventListingComponent implements OnInit, OnDestroy {
  upcomingEventObservable$;
  pastEventObservable$;
  upcomingEvent = true;
  constant = Constants;
  isPlanner;
  readonly destroyed$ = new Subject();
  paramsLength = 0;
  dynamicBreadcrumb = BreadCrumb.adminEvents;
  isAdmin;
  plannerId;
  plannerName = '';
  constructor(
    private readonly addEditEventService: AddEditEventService, private readonly plannerMgmtService: PlannerManagementService,
    readonly route: ActivatedRoute, private readonly sessionService: SessionManagerService,
    private readonly router: Router, private readonly checkRole: CheckRoles) { }

  ngOnInit() {
    this.plannerId = this.route.snapshot.params.plannerId;
    if (this.plannerId) {
      this.getPlannerName();
    }
    this.isAdmin = this.checkRole.isAdmin();
    this.getPaginatedData();
    this.getEventsData();
    this.isPlanner = isPlanner(this.sessionService.getRole());
  }

  getEventsData(parameters?) {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      let sortingParams = { ...params };
      if (this.route.snapshot.params.plannerId) {
        sortingParams = {
          ...sortingParams,
          id: this.route.snapshot.params.plannerId,
          role: Constants.Role.PLANNER
        };
      }
      this.paramsLength = Object.keys(params).length;
      if (sortingParams && sortingParams.type && sortingParams.type.length) {
        delete sortingParams.type;
      }
      if (this.route.snapshot.queryParams.type === Constants.EVENT_TYPE.pastEvent) {
        this.upcomingEvent = false;
        this.getPastEvents(sortingParams);
      } else {
        this.upcomingEvent = true;
        this.getUpcomingEvents(sortingParams);
      }
    });
  }


  getPaginatedData() {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      if (params.page) {
        this.getEventsData(params);
      } else {
        this.getEventsData();
      }

    });
  }


  getUpcomingEvents(options?) {
    this.upcomingEventObservable$ = this.addEditEventService.getAllUpcomingEvents(options);
  }

  getPastEvents(options?) {
    this.upcomingEventObservable$ = null;
    this.pastEventObservable$ = this.addEditEventService.getAllPastEvents({ ...options, type: 'past' });
  }

  navigateToUpcoming(type) {
    if (type === Constants.EVENT_TYPE.upcomingEvent) {
      this.upcomingEvent = true;
      this.router.navigate(['./'], { queryParams: { type: Constants.EVENT_TYPE.upcomingEvent }, relativeTo: this.route });
    } else {
      this.upcomingEvent = false;
      this.getPastEvents();
      this.router.navigate(['./'], { queryParams: { type: Constants.EVENT_TYPE.pastEvent }, relativeTo: this.route });
    }

  }

  fetchUpdatedList(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
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
