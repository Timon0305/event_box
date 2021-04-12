import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { PartnerAddProfileService } from '../../partner-add-profile/services/partner-add-profile.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Location, DOCUMENT } from '@angular/common';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { isAdmin, getFilterDateRange, copyAnyUrl } from '@app/core/utils/common.util';
import { environment } from '@environments/environment';
import { Constants } from '@app/config/constant';
import { LoaderService } from '@app/core/services/loader.service';

@Component({
  selector: 'app-partner-analytics',
  templateUrl: './partner-analytics.component.html',
  styleUrls: ['./partner-analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PartnerAnalyticsComponent implements OnInit {
  partnerDetails$;
  partnerDetails;
  isAdmin = false;
  referralUrl;
  partnerAnalytics$; // In case of partner login
  analytics;
  constructor(
    private readonly loader: LoaderService,
    private readonly sessionService: SessionManagerService,
    public readonly loc: Location,
    public readonly activatedRoute: ActivatedRoute,
    private readonly partnerProfileService: PartnerAddProfileService,
    @Inject(DOCUMENT) private readonly document: Document) { }

  ngOnInit() {
    const baseUrl = `${environment.appUrl}?referredBy=`;
    this.isAdmin = isAdmin(this.sessionService.getRole());
    if (this.isAdmin) {
      this.referralUrl = `${baseUrl}${this.activatedRoute.snapshot.params.partnerId}`;
      this.getAdminPartnerDetails({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) });
    } else {
      this.partnerDetails$ = this.sessionService.getUserData().pipe(map(res => {
        this.partnerDetails = res;
        this.referralUrl = `${baseUrl}${this.partnerDetails._id}`;
      }));
      this.getPartnerAnalytics({ ...getFilterDateRange(Constants.API_DATE_FILTER_TYPE.month) });
    }
  }

  quoteDateFilter(filter) {
    const { dateFrom = null, dateTo = null } = { ...filter };
    if (this.isAdmin) {
      this.getAdminPartnerDetails({ dateFrom, dateTo });
    } else {
      this.getPartnerAnalytics({ dateFrom, dateTo });
    }
  }

  copyUrl() {
    copyAnyUrl('referralInput', this.document);
  }

  getAdminPartnerDetails(params) {
    this.loader.start();
    this.partnerDetails$ =
      this.partnerProfileService.getPartnerDetailsApi
        (this.activatedRoute.snapshot.params.partnerId, params)
        .pipe(map(res => {
          this.partnerDetails = res;
          this.analytics = {
            ...res.referrals,
            ...res.partnerOrders
          };
        }));
  }

  getPartnerAnalytics(params) {
    this.partnerAnalytics$ = this.partnerProfileService.partnerAnalytics(params)
      .pipe(map(res => {
        this.analytics = {
          ...res
        };
      }));
  }
}
