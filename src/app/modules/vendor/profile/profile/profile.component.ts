import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Subject } from 'rxjs/internal/Subject';
import { VendorService } from '../../services/vendor.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { RatingReviewService } from '@app/modules/planner/rating-review/services/rating-review.service';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '@app/config/constant';
import { LoaderService } from '@app/core/services/loader.service';
import { SharedConfirmationPopupService } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [VendorService, RatingReviewService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  constNumber = Constants.NUMBER;
  subsriptionConstant = Messages.SUBSCRIPTION_TYPES;
  ratingNreviewList;
  constructor(
    readonly sessionService: SessionManagerService, readonly vendorService: VendorService,
    readonly flash: AlertService, private readonly loader: LoaderService,
    private readonly ratingReviewService: RatingReviewService,
    private readonly route: ActivatedRoute, private readonly popupService: SharedConfirmationPopupService) { }
  profileDataObservable$;
  allLocationsObservable$;
  ratingNreviewObservable$;
  ngOnInit() {
    this.profileDataObservable$ = this.sessionService.getUserData();
    this.ratingNreviewObservable$ = this.ratingReviewService.getVendorRatingNReviewList({ limit: this.constNumber.five });
    this.fetchLocations();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  fetchLocations() {
    this.allLocationsObservable$ = this.vendorService.getVendorLocations();
  }

  openPopup() {
    this.popupService.showPopup(Constants.CANCEL_SUBSCRIPTION, true)
      .result.then(res => {
        if (!res) {
          this.cancelSubscription();
        }
      }).catch(res => res);

  }
  cancelSubscription() {
    this.loader.start();
    this.vendorService.deleteSubscription()
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.sessionService.setProfileEvent(true);
        this.loader.stop();
        this.flash.showSuccess(Messages.SUCCESS.unsubsribed);
      }, error => {
        this.loader.stop();
        this.flash.showError(Messages.ERROR.apiError);
      });
  }


}
