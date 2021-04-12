import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { ProfileService } from '../service/profile.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';

@Component({
  selector: 'app-view-bank-details',
  templateUrl: './view-bank-details.component.html',
})
export class ViewBankDetailsComponent implements OnInit, OnDestroy {
  @Input() bankDetail;
  constructor(readonly profileService: ProfileService, private readonly sessionService: SessionManagerService) { }
  readonly destroyed$ = new Subject();

  ngOnInit() {
  }

  async deleteBankDetails() {
    const deleteConfirmation = await this.profileService.openConfirmationPopup(Constants.DELETE_BANKDETAIL);
    if (deleteConfirmation) {
      this.profileService.deleteBankDetail()
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          delete this.bankDetail;
          this.sessionService.setProfileEvent(true);
        }, error => {
        });
    }
    return;

  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
