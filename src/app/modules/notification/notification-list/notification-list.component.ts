import { Component, OnInit } from '@angular/core';
import { NotificationApiService } from '../service/notification-api.service';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { trackByObjectId, changeQueryParams } from '@app/core/utils/common.util';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core/services/common/common.service';
import { take } from 'rxjs/internal/operators/take';
import { Notifications } from '@app/config/notifications';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notificationData$;
  loading = false;
  trackByFn = trackByObjectId;
  isCountCalled = false;
  notificationTypeRedirect = Notifications.NOTIFICATION_TYPE_REDIRECT;
  tableMaxSize = Constants.PAGINATION_MAX_SIZE;
  constructor(
    private readonly notificationAPiService: NotificationApiService,
    private readonly router: Router, private readonly route: ActivatedRoute,
    private readonly commonService: CommonService) { }

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    this.getNotificationList(params);
  }

  getNotificationList(params = {}) {
    this.loading = true;
    this.notificationData$ = this.notificationAPiService.getNotificationList(params)
      .pipe(map(res => {
        this.loading = false;
        if (!this.isCountCalled) {
          this.commonService.getHeaderCountApi().pipe(take(1)).subscribe(() => this.isCountCalled = true);
        }
        return res;
      }), catchError(error => {
        this.loading = false;
        return throwError(error);
      }));
  }

  pageChange(page) {
    this.getNotificationList({ page });
    changeQueryParams({ page }, this.route, this.router);
  }
  navigate(notificationType, typeId = '') {
    if (
      [this.notificationTypeRedirect.EXPORTED_CSV_IS_READY,
      this.notificationTypeRedirect.NOTIFY_CANCEL_ORDER_VENDOR, this.notificationTypeRedirect.NOTIFY_ACH_PAYOUT_VENDOR]
      .indexOf(notificationType) < 0) {
      if (notificationType === this.notificationTypeRedirect.NOTIFY_PRODUCT_REVIEW_VENDOR && typeId) {
        this.router.navigate([Constants.APPLICATION_ROUTES.vendor.productsServices, typeId]);
      } else {
        this.router.navigateByUrl(this.notificationTypeRedirect[notificationType]);
      }
    }
  }

}
