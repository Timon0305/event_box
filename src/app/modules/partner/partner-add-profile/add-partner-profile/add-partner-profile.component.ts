import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { ActivatedRoute } from '@angular/router';
import { PartnerAddProfileService } from '../services/partner-add-profile.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-add-partner-profile',
  templateUrl: './add-partner-profile.component.html',
  styleUrls: ['./add-partner-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddPartnerProfileComponent implements OnInit, OnDestroy {
  addFixedFooterClassSidebar = true;
  profileTabs = Constants.PARTNER_ADD_PROFILE_TAB;
  activeTab = Constants.PARTNER_ADD_PROFILE_TAB.basicDetails;
  partnerId;
  destroyed$ = new Subject();
  constructor(private readonly activatedRoute: ActivatedRoute, private readonly partnerAddProfile: PartnerAddProfileService) { }

  ngOnInit() {
    this.partnerId = this.activatedRoute.snapshot.params.partnerId ||
     this.activatedRoute.snapshot.firstChild && this.activatedRoute.snapshot.firstChild.params.partnerId;
    if (this.partnerId) {
      this.partnerAddProfile.getPartnerDetailsApi(this.partnerId).pipe(takeUntil(this.destroyed$)).subscribe();
    } else {
      this.partnerAddProfile.setPartnerDetails({});
    }
  }


  onActivate(event) {
    this.activeTab = event.activeTab;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
