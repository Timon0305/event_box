import { Component, OnInit, Input, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AcceptVendorFormHelper } from './accept-vendor.form';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { VendorManagementService } from '../../services/vendor-management.service';
import { Constants } from '@app/config/constant';
import { IDayCalendarConfig, DatePickerComponent } from 'ng2-date-picker';
import { getDatetoISOFormat, showUIDateOFormat } from '@app/core/utils/common.util';
import { CommonService } from '@app/core/services/common/common.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { dateFormatValidator } from '@app/core/validators/date-format.validator';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-accept-vendor',
  templateUrl: './accept-vendor.component.html',
  styleUrls: ['./accept-vendor.component.scss'],
  providers: [AcceptVendorFormHelper, VendorManagementService]
})
export class AcceptVendorComponent implements OnInit, OnDestroy {
  acceptVendorForm: FormGroup;
  vendorId: string;
  addFixedFooterClassSidebar = true;
  constPlanFrequency = Constants.PLAN_FREQUENCY;
  prefixSuffix = Constants.PROMO_CODE_PREFIX_SUFFIX;
  constNUMBER = Constants.NUMBER;
  date;
  destroyed$ = new Subject();
  @ViewChild('startDate', { static: false }) startDate: DatePickerComponent;
  public dayPickerConfig = { ...Constants.DATE_PICKER_ADMIN_VALIDATIONS as IDayCalendarConfig };
  @Input() fromEdit;
  breadcrumb = BreadCrumb.adminAcceptVendor;
  memberPackage;
  vendorName;
  formValues;
  isTermsAccepted = false;
  TERMS_AND_COND = Constants.PROMO_CODE.TERMS_N_CONDITIONS;
  constructor(
    private readonly form: AcceptVendorFormHelper, private readonly cdr: ChangeDetectorRef,
    private readonly vendorManagementService: VendorManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly flash: AlertService, private readonly commonService: CommonService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.acceptVendorForm = this.form.buildForm();
    this.setTermsNconditions();
    this.fromEdit = this.activatedRoute.snapshot.data.editMembership;
    this.vendorId = this.activatedRoute.snapshot.params.id;
    if (this.fromEdit) {
      this.vendorManagementService.getVendorById(this.activatedRoute.snapshot.params.id)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.vendorName = res.company ? res.company.name : '';
          this.memberPackage = res.company.memberPackage || null;
          this.isTermsAccepted = res.company.isTermsAccepted;
          showUIDateOFormat(Constants.MEMBERSHIP_DATE_FIELD, this.memberPackage, Constants.DATE_CONFIG.format);
          this.form.patchForm({ form: this.acceptVendorForm, payload: this.memberPackage });
        });
    }
    this.formValues = { ...this.acceptVendorForm.value };
    this.acceptVendorForm.valueChanges
      .pipe(filter(res => JSON.stringify(res) !== JSON.stringify(this.formValues)))
      .subscribe(res => {
        this.formValues = { ...res };
        if (res.yearlySubscriptionFee || res.startDate || res.planFrequency) {
          this.setControlsValidator();
        } else if (!(res.yearlySubscriptionFee || res.startDate || res.planFrequency)) {
          this.resetControlsValidators();
        }
      });
  }

  setTermsNconditions() {
    this.acceptVendorForm.patchValue({
      terms_conditions: Constants.PROMO_CODE.TERMS_N_CONDITIONS,
    });
  }
  get f() {
    return this.acceptVendorForm;
  }

  acceptVendor() {
    this.loaderService.start();
    if (this.acceptVendorForm.controls.plannerCommission.value === null) {
      this.acceptVendorForm.controls.plannerCommission.setValue(0);
    }
    const data = this.acceptVendorForm.value;
    getDatetoISOFormat(Constants.MEMBERSHIP_DATE_FIELD, data);
    this.acceptVendorApi(data).pipe(takeUntil(this.destroyed$)).subscribe(
      res => {
        this.commonService.getHeaderCountApi().pipe(takeUntil(this.destroyed$)).subscribe();
        this.loaderService.stop();
        this.flash.showSuccess(!this.fromEdit ? Messages.SUCCESS.vendorAccepted : Messages.SUCCESS.membershipDetailsUpdated);
        if (this.fromEdit) {
          this.router.navigate(['/admin/vendor-management/view', this.vendorId]);
        } else {
          this.router.navigateByUrl('/admin/pending-vendors');
        }
      },
      err => {
        this.loaderService.stop();
      }
    );
  }

  openSeletedDatePicker(selectedDate) {
    this[selectedDate].api.open();
  }

  acceptVendorApi(data) {
    return this.vendorManagementService.acceptVendor(this.vendorId, data);
  }

  resetControlsValidators() {
    this.acceptVendorForm.controls.yearlySubscriptionFee.setValidators(null);
    this.acceptVendorForm.controls.yearlySubscriptionFee.updateValueAndValidity();
    this.acceptVendorForm.controls.startDate.setValidators(Validators.compose([dateFormatValidator]));
    this.acceptVendorForm.controls.startDate.updateValueAndValidity();
    this.acceptVendorForm.controls.planFrequency.setValidators(null);
    this.acceptVendorForm.controls.planFrequency.updateValueAndValidity();
  }

  setControlsValidator() {
    this.acceptVendorForm.controls.planFrequency.setValidators(Validators.required);
    this.acceptVendorForm.controls.planFrequency.updateValueAndValidity();
    if (this.fromEdit) {
      this.acceptVendorForm.controls.startDate.setValidators(Validators.compose([Validators.required]));
    } else {
      this.acceptVendorForm.controls.startDate.setValidators(Validators.compose([Validators.required, dateFormatValidator]));
    }
    this.acceptVendorForm.controls.startDate.updateValueAndValidity();
    this.acceptVendorForm.controls.yearlySubscriptionFee.setValidators(Validators.required);
    this.acceptVendorForm.controls.yearlySubscriptionFee.updateValueAndValidity();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
