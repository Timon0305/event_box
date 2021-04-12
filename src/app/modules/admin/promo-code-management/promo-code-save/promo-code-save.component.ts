import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PromoCodeManagementService } from '../services/promo-code-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { PromoCodeSaveFormHelper } from './promo-code-save.form';
import { Messages } from '@app/config/messages';
import { Subject } from 'rxjs/internal/Subject';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IDayCalendarConfig, DatePickerComponent } from 'ng2-date-picker';
import { getDatetoISOFormat } from '@app/core/utils/common.util';
@Component({
  selector: 'app-promo-code-save',
  templateUrl: './promo-code-save.component.html',
  styleUrls: ['./promo-code-save.component.scss'],
  providers: [PromoCodeSaveFormHelper, PromoCodeManagementService]
})
export class PromoCodeSaveComponent implements OnInit, OnDestroy {

  readonly destroyed$ = new Subject();
  savePromoCodeForm: FormGroup;
  promoCodeId: string;
  editForm = false;
  @ViewChild('startDate', {static: false}) startDate: DatePickerComponent;
  @ViewChild('endDate', {static: false}) endDate: DatePickerComponent;

  associatedVendorObservable$;
  constPromoCodeType = Constants.PROMO_CODE_TYPE;
  promoCodePrefixSuffix = Constants.PROMO_CODE_PREFIX_SUFFIX.PERCENT;
  addFixedFooterClassSidebar = true;
  selected;
  multiplleSelect = true;
  promoCodeValue = '';
  promoCodetype = '';
  promoCodePrefixDollar = Constants.PROMO_CODE_PREFIX_SUFFIX.AMOUNT.PREFIX_SIGN;
  messageConst = Messages.VARIABLE_INFO_ERROR_TYPES;
  public dayPickerConfig = Constants.DATE_PICKER_VALIDATIONS as IDayCalendarConfig;
  totalPages;
  currentPage = 0;
  date;
  companyItems;
  multiSelectSearchKey = '';
  mergeAssociatedData = [];

  constructor(
    private readonly formHelper: PromoCodeSaveFormHelper,
    private readonly promoCodeManagementService: PromoCodeManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly flash: AlertService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.promoCodeId = params.id;
      if (this.promoCodeId) {
        this.editForm = true;
        this.promoCodeManagementService.getPromoCode(this.promoCodeId).subscribe(
          data => {
            data.termsNConditions = Constants.PROMO_CODE.TERMS_N_CONDITIONS;
            this.promoCodetype = data.promoCodeType;
            this.promoCodeValue = data.promoCodeValue;
            this.promoCodePrefixSuffix = Constants.PROMO_CODE_PREFIX_SUFFIX[data.promoCodeType];
            this.promoCodeManagementService.patchDateForUI(this.savePromoCodeForm, data);
            if (data.associatedVendors.length) {
              this.mergeAssociatedData = data.associatedVendors;
              this.selected = data.associatedVendors.map((associatedVendor) => {
                return associatedVendor._id;
              });
            } else {
              this.mergeAssociatedData = [];
              this.removeMultuselectNSetAll();
            }
          }
        );
      }
    });
    this.savePromoCodeForm = this.formHelper.buildForm();
    this.getAssociatedVendor();
    this.setPromoCodeType();
  }

  get f() {
    return this.savePromoCodeForm;
  }

  setPromoCodeType() {
    this.savePromoCodeForm.patchValue({
      promoCodeType: this.constPromoCodeType[0].value,
      termsNConditions: Constants.PROMO_CODE.TERMS_N_CONDITIONS,
    });
  }

  getAssociatedVendor() {
    const queryString = { page: this.currentPage + 1, filter: this.multiSelectSearchKey };
    this.associatedVendorObservable$ = this.promoCodeManagementService.getAllAssociatedVendor(queryString).pipe(
      map((associatedVendor) => {
        this.totalPages = associatedVendor.totalPages;
        this.currentPage = associatedVendor.page;
        const companyObj = associatedVendor.docs.filter(company => company).map(({ company }) => company);
        this.companyItems = this.companyItems ? [...this.companyItems, ...companyObj] : [Constants.PROMO_CODE_SELECTALL, ...companyObj];
        if (this.mergeAssociatedData.length) {
          this.companyItems = this.companyItems.concat(this.mergeAssociatedData);
        }
        return this.companyItems;
      }));
  }

  changeType(promoType) {
    this.promoCodePrefixSuffix = Constants.PROMO_CODE_PREFIX_SUFFIX[promoType.toUpperCase()];
    if (this.promoCodeValue && this.promoCodetype === promoType.toUpperCase()) {
      this.savePromoCodeForm.patchValue({ promoCodeValue: this.promoCodeValue });
    } else {
      this.savePromoCodeForm.patchValue({ promoCodeValue: '' });
    }
  }

  openSeletedDatePicker(selectedDate) {
    this[selectedDate].api.open();
  }

  addPromoCode() {
    this.loaderService.start();
    const data = this.savePromoCodeForm.value;
    this.setAssociateVendor(data);
    this.promoCodeManagementService.addPromoCode(data).subscribe(
      res => {
        this.flash.showSuccess(Messages.SUCCESS.adminPromoCodeAdded);
        this.loaderService.stop();
        this.router.navigateByUrl('/admin/promo-code-management');
      },
      err => {
        this.flash.showError(Messages.ERROR_TYPES[err.error.message]);
        this.loaderService.stop();
      }
    );
  }

  setAssociateVendor(data) {
    data.associatedVendors = (data.associatedVendors === Constants.PROMO_CODE_SELECTALL._id) ?
      [] : data.associatedVendors;
    getDatetoISOFormat(Constants.PROMO_CODE_DATE_FIELD, data);
  }

  updatePromoCode() {
    this.loaderService.start();
    const data = this.savePromoCodeForm.value;
    this.setAssociateVendor(data);
    this.promoCodeManagementService.updatePromoCode(this.promoCodeId, data).subscribe(
      res => {
        this.flash.showSuccess(Messages.SUCCESS.adminPromoCodeUpdated);
        this.loaderService.stop();
        this.router.navigateByUrl('/admin/promo-code-management');
      },
      err => {
        this.flash.showError(Messages.ERROR_TYPES[err.error.message]);
        this.loaderService.stop();
      }
    );
  }

  isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }

  removeMultuselectNSetAll() {
    this.multiplleSelect = false;
    this.selected = Constants.PROMO_CODE_SELECTALL._id;
  }

  getSelectedAssociateVendor(event) {
    if ((this.multiplleSelect) &&
      event.find(data => data._id === Constants.PROMO_CODE_SELECTALL._id)) {
      this.removeMultuselectNSetAll();
    } else if (this.isObject(event)) {
      this.multiplleSelect = true;
      this.selected = [event._id];
    } else {
      this.multiplleSelect = true;
    }
  }

  onScrollToEnd() {
    if (this.currentPage < this.totalPages) {
      this.getAssociatedVendor();
    }
  }
  onSearch(event) {
    this.multiSelectSearchKey = (event.term) ? event.term : '';
    this.getAssociatedVendor();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
