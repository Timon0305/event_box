import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePickerComponent } from 'ng2-date-picker';
import { Constants } from '@app/config/constant';
import { FormGroup } from '@angular/forms';
import { PartnerAddProfileService } from '../services/partner-add-profile.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import * as moment from 'moment';
@Component({
  selector: 'app-add-commission-details',
  templateUrl: './add-commission-details.component.html',
  styleUrls: ['./add-commission-details.component.scss']
})
export class AddCommissionDetailsComponent implements OnInit, OnDestroy {
  activeTab = Constants.PARTNER_ADD_PROFILE_TAB.commissionDetails;
  @ViewChild('startDate', { static: false }) startDate: DatePickerComponent;
  @ViewChild('endDate', { static: false }) endDate: DatePickerComponent;
  public dayPickerConfig = { ...Constants.DATE_PICKER_ADMIN_VALIDATIONS };
  commissionDetailsForm: FormGroup;
  amountPrefixSign = Constants.PROMO_CODE_PREFIX_SUFFIX.AMOUNT.PREFIX_SIGN;
  destroyed$ = new Subject();
  minEndDate;
  constructor(
    private readonly addProfileService: PartnerAddProfileService,
    private readonly router: Router, private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.commissionDetailsForm = this.addProfileService.getComissionDetailsForm();
    this.commissionDetailsForm.controls.startDate.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.minEndDate = moment(res, Constants.DATE_CONFIG.format).add(1, 'day').format(Constants.DATE_CONFIG.format);
        this.dayPickerConfig.endDate = {
          ...this.dayPickerConfig.endDate,
          min: this.minEndDate
        };
      });
    this.addProfileService.getPartnerDetails().pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.addProfileService.patchCommissionDetails(this.commissionDetailsForm, res);
    });
  }

  saveAndContinue() {
    this.addProfileService.updateCommissionDetails
      (this.commissionDetailsForm.value, this.activatedRoute.snapshot.params.partnerId)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        if (res.isProfileCompleted && res.partnerDetails.bankDetail) {
          this.router.navigate(['/admin/partner-management/list']);
        } else {
          this.router.navigate(['../../bank-details', this.activatedRoute.snapshot.params.partnerId],
            { relativeTo: this.activatedRoute });
        }

      });
  }

  openSeletedDatePicker(selectedDate) {
    this[selectedDate].api.open();
    this.commissionDetailsForm.controls[selectedDate].markAsTouched();
  }

  back() {
    this.router.navigate(['/admin/partner', this.activatedRoute.snapshot.params.partnerId]);
  }

  submitForm() {

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
