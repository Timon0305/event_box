import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IBasicUser } from '@app/models/IUserDetails';
import { PlProfileViewService } from '../services/pl-profile-view.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { Constants } from '@app/config/constant';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';


@Component({
  selector: 'app-card-detail-view',
  templateUrl: './card-detail-view.component.html',
  styleUrls: ['./card-detail-view.component.scss'],
})
export class CardDetailViewComponent implements OnInit, OnDestroy {

  @Input() profile: IBasicUser;
  readonly destroyed$ = new Subject();

  constructor(readonly plProfileViewService: PlProfileViewService, readonly flash: AlertService,
              readonly sessionService: SessionManagerService) { }

  ngOnInit() {
  }

  changeDefaultCard(cardDetail) {
    this.plProfileViewService.changeDefaultCreditCard(cardDetail._id)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.sessionService.setProfileEvent(true);
       });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  async deleteCreditCard(cardDetail, index) {
    const deleteConfirmation = await this.plProfileViewService.openConfirmationPopup(Constants.DELETE_BANKDETAIL);
    if (deleteConfirmation) {
      this.plProfileViewService.deleteCreditCard(cardDetail._id)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          if (this.profile && this.profile.payment) {
            this.profile.payment.cards.splice(index, 1);
          }

          this.flash.showSuccess(Messages.SUCCESS.accountDeleted);
        }, error => {
          this.flash.showError(Messages.ERROR.changeDefaultCard);
        });
    }
    return;
  }

}
