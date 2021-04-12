import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { filter } from 'rxjs/internal/operators/filter';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from '@environments/environment';
import { DOCUMENT } from '@angular/common';
import { copyAnyUrl } from '@app/core/utils/common.util';
import { InviteServiceService } from '../services/invite-service.service';
import { map } from 'rxjs/internal/operators/map';


@Component({
  selector: 'app-invite-analytics',
  templateUrl: './invite-analytics.component.html',
  styleUrls: ['./invite-analytics.component.scss'],
  providers: [InviteServiceService]
})
export class InviteAnalyticsComponent implements OnInit, OnDestroy {
  user;
  referralUrl;
  loader = false;
  analyticsData$;
  readonly destroyed$ = new Subject();
  analytics;

  constructor(
    private readonly sessionService: SessionManagerService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly inviteService: InviteServiceService) { }

  ngOnInit() {
    this.getUserData();
    this.getInviteAnalytics();

  }

  getUserData() {
    this.sessionService.getUserData().pipe(takeUntil(this.destroyed$), filter(res => !!res)).subscribe(res => {
      this.user = res;
      const baseUrl = `${environment.appUrl}?referredBy=`;
      if (this.user && this.user.company) {
        this.referralUrl = `${baseUrl}${this.user.company._id}`;
      }
    });
  }

  getInviteAnalytics() {
    this.loader = true;
    this.analyticsData$ = this.inviteService.getInviteAnalytics({})
      .pipe(map(res => {
        this.analytics = res;
        this.loader = false;
      }));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  copyUrl() {
    copyAnyUrl('referralInput', this.document);
  }

}
