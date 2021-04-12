
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoaderService } from '@app/core/services/loader.service';
import { ProfileService } from '@modules/complete-profile/services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { Constants } from '@app/config/constant';
import { IBasicUser } from '@app/models/IUserDetails';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { PartnerAddProfileService } from '@app/modules/partner/partner-add-profile/services/partner-add-profile.service';

@Component({
  selector: 'app-shared-bank-detail-form',
  templateUrl: './shared-bank-detail-form.component.html',
  styleUrls: ['./shared-bank-detail-form.component.scss'],
  providers: [ProfileService]
})
export class SharedBankDetailFormComponent implements OnInit, OnDestroy {
  @Input() fromPartner;
  @Output() savePartnerBankDeatils = new EventEmitter();
  isPartnerBankEdit = false;
  public f: FormGroup;
  public editBankDetails = false;
  destroyed$ = new Subject();
  isBankdetailsExist;
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly partnerBankDetailsService: PartnerAddProfileService,
    private readonly activatedRoute: ActivatedRoute,
    readonly loader: LoaderService, readonly profileService: ProfileService, readonly router: Router,
    readonly sessionService: SessionManagerService, readonly flash: AlertService) { }

  ngOnInit() {
    this.f = this.profileService.createBankDetailForm();
    this.partnerBankDetailsService.getPartnerDetails().subscribe(res => {
      this.checkIfBankDetailsExist(res);
    });
    if (!this.fromPartner) {
      if (window.location.href.includes(Constants.profileType.editBankDetails)) {
        this.editBankDetails = true;
      }
      this.sessionService.getUserData().pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
          const userData = res as IBasicUser;
          if (userData.company && userData.company.bankDetail) {
            this.isBankdetailsExist = true;
            this.profileService.patchBankDetailForm(this.f, userData.company.bankDetail);
          }
        });
    }

  }

  submitBankDetail() {
    this.loader.start();
    this.profileService.updateBankDetails(this.f.value).pipe(takeUntil(this.destroyed$))
      .subscribe(createdBankDetails => {
        this.flash.showSuccess(Messages.SUCCESS.bankDetailCreated);
        this.loader.stop();
        this.sessionService.setProfileEvent(true);
        this.router.navigate(['vendor/profile']);
      }, error => {
        if (error.error.message.includes(Constants.TEST_MODE_BANK_DETAILS)) {
          this.flash.showError(Messages.ERROR.apiError);
        } else {
          this.flash.showError(error.error.message);
        }
        this.loader.stop();
      });
  }


  backToVendorDetail() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`vendor/complete-profile/vendor-detail`]));
  }


  skipBankDetail() {
    this.loader.start();
    this.profileService.skipDetails()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.loader.stop();
        this.router.navigate(['vendor/profile']);
      }, error => {
        this.loader.stop();
      }
      );
  }

  back() {
    this.router.navigate(['/admin/partner/commission-details',
      this.activatedRoute.snapshot.params.partnerId]);
  }

  savePartnerBank() {
    this.savePartnerBankDeatils.emit(this.f.value);
  }

  checkIfBankDetailsExist(data) {
    if (data.partnerDetails && data.partnerDetails.bankDetail && data.partnerDetails.bankDetail.accountNumber) {
      this.isBankdetailsExist = true;
      this.isPartnerBankEdit = true;
      this.profileService.patchBankDetailForm(this.f, { ...data.partnerDetails.bankDetail });
    } else {
      this.isBankdetailsExist = false;
      this.isPartnerBankEdit = false;
      this.f.reset();
    }
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
