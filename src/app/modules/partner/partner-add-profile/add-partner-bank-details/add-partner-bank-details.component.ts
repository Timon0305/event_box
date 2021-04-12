import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { PartnerAddProfileService } from '../services/partner-add-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-add-partner-bank-details',
  templateUrl: './add-partner-bank-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPartnerBankDetailsComponent implements OnInit, OnDestroy {
  activeTab = Constants.PARTNER_ADD_PROFILE_TAB.bankDetails;
  destroyed$ = new Subject();
  isBankDetailExist = false;
  partnerBankDetail;
  constructor(
    private readonly addProfileService: PartnerAddProfileService,
    private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['/admin/edit-partner/commission-details', this.route.snapshot.params.partnerId]);
  }

  savePartnerBankDeatils(bankDetails) {
    this.addProfileService.updateBankDetails(bankDetails, this.route.snapshot.params.partnerId)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.router.navigate(['/admin/partner-management/list']);
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
