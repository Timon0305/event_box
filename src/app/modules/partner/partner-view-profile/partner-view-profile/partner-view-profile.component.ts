import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SharedConfirmationPopupService } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { Constants } from '@app/config/constant';
import { PartnerAddProfileService } from '../../partner-add-profile/services/partner-add-profile.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-partner-view-profile',
  templateUrl: './partner-view-profile.component.html',
  styleUrls: ['./partner-view-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PartnerViewProfileComponent implements OnInit, OnDestroy {
  @Input() partnerDetails;
  @Input() isAdmin;
  destroy$ = new Subject();
  constructor(
    private readonly partnerProfileService: PartnerAddProfileService,
    private readonly cdr: ChangeDetectorRef, private readonly popupService: SharedConfirmationPopupService) { }

  ngOnInit() {
  }

  deleteBank() {
    this.popupService.showPopup(Constants.DELETE_BANKDETAIL).result.then(delte => {
      if (delte) {
        this.removeBankDetails();
      }
    }).catch(error => error);
  }

  removeBankDetails() {
    this.partnerProfileService.adminDeletePartnerBank(this.partnerDetails._id)
      .pipe(takeUntil(this.destroy$)).subscribe(res => {
        this.partnerDetails = {
          ...this.partnerDetails,
          partnerDetails: {
            ...this.partnerDetails.partnerDetails,
            bankDetail: null
          }
        };
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
