import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Notifications } from '@app/config/notifications';
import { Constants } from '@app/config/constant';
import { CheckRoles, isEventDetailPage } from '@app/core/utils/common.util';
import { PlannerManagementService } from '@app/modules/admin/planner-management/services/planner-management.service';

@Component({
  selector: 'app-quotes-section',
  templateUrl: './quotes-section.component.html',
  styleUrls: ['./quotes-section.component.scss'],
})
export class QuotesSectionComponent implements OnInit, OnDestroy {
  routeUrl = Notifications.NOTIFICATION_TYPE_REDIRECT;
  readonly destroyed$ = new Subject();
  heading;
  isAdmin = false;
  isEventDetail = false;
  adminReports = Constants.APPLICATION_ROUTES.admin.reports;
  plannerId;
  plannerName = '';
  @ViewChild('adminScroll', {static: true}) adminScroll: ElementRef;
  constructor(
    private readonly route: ActivatedRoute, private readonly plannerMgmtService: PlannerManagementService,
    private readonly sessionService: SessionManagerService,
    private readonly router: Router, private readonly checkRole: CheckRoles
  ) { }

  ngOnInit() {
    this.plannerId = this.route.snapshot.params.plannerId;
    if (this.plannerId) {
      this.plannerMgmtService.getPlannerName(this.plannerId)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.plannerName = res.plannerName;
        });
    }
    this.isAdmin = this.checkRole.isAdmin();
    this.isEventDetail = isEventDetailPage(this.router);
    if (!this.isEventDetail) {
      this.sessionService.setProfileEvent(true);
      this.checkHeadingWithTabs();
      this.checkHeader();
    }
  }

  checkHeader() {
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.checkHeadingWithTabs();
    });
  }

  checkHeadingWithTabs() {
    if (this.router.url.includes(Constants.QUOTE_SECTION_TAB_HEADING.acceptRej)) {
      this.heading = Constants.PLANNER_QUOTE_HEADING.ACCEPTED_REJECTED_QUOTES;
    } else if (this.router.url.includes(Constants.QUOTE_SECTION_TAB_HEADING.expired)) {
      this.heading = Constants.PLANNER_QUOTE_HEADING.EXPIRED_QUOTES;
    } else if (this.router.url.includes(Constants.QUOTE_SECTION_TAB_HEADING.awaiting)) {
      this.heading = Constants.PLANNER_QUOTE_HEADING.AWAITNG_VENDOR_QUOTES;
    } else {
      this.heading = Constants.PLANNER_QUOTE_HEADING.PENDING_PAYMENT_QUOTES;
    }
  }

  scroll() {
    this.adminScroll.nativeElement.scrollIntoView(true, {behavior: 'smooth'});
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
