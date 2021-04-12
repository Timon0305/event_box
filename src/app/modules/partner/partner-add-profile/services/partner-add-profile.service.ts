import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { dateFormatValidator } from '@app/core/validators/date-format.validator';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { LoaderService } from '@app/core/services/loader.service';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import {
  getDatetoISOFormat, mapPartnerBankDetails, showUIDateOFormat,
  preparePhoneFormat, getCountryCodeAndPhone
} from '@app/core/utils/common.util';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import * as moment from 'moment';
import { Messages } from '@app/config/messages';
@Injectable({
  providedIn: 'root'
})
export class PartnerAddProfileService {
  partnerDeatils$ = new BehaviorSubject<Record<string, object>>({});
  constructor(
    private readonly alert: AlertService,
    private readonly loader: LoaderService,
    private readonly fb: FormBuilder, private readonly request: RequestService) { }

  getBasicDetailsForm() {
    return this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      businessName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])],
      mobile: [''],
      address: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      phoneCountryCode: [Constants.DEFAULT_COUNTRY_CODE],
      mobileCountryCode: [Constants.DEFAULT_COUNTRY_CODE],
      zipCode: ['', Validators.compose([Validators.required, Validators.maxLength(Constants.MAX_ZIP_LENGTH)])]
    });
  }

  getComissionDetailsForm() {
    return this.fb.group({
      startDate: [null, Validators.compose([Validators.required, dateFormatValidator])],
      endDate: [null, Validators.compose([Validators.required, dateFormatValidator])],
      commissionForVendors: [null, Validators.compose([Validators.required,
      Validators.max(Constants.NUMBER.hundred), Validators.pattern(Constants.ACCEPT_VENDOR_FORM.FEE_PATTERN)])],
      commissionForPlanners: [null, Validators.compose([Validators.required])],
    });
  }

  patchBasicDetails(form: FormGroup, payload) {
    if (payload.email) {
      const phoneData = getCountryCodeAndPhone(payload.phone);
      const mobilePhoneData = getCountryCodeAndPhone(payload.partnerDetails.mobile);
      form.patchValue({
        firstName: payload.firstName,
        lastName: payload.lastName,
        businessName: payload.partnerDetails.businessName,
        email: payload.email,
        phone: phoneData.phone,
        phoneCountryCode: phoneData.countryCode,
        mobile: mobilePhoneData.phone,
        mobileCountryCode: mobilePhoneData.countryCode,
        address: payload.partnerDetails.address,
        city: payload.partnerDetails.city,
        state: payload.partnerDetails.state,
        zipCode: payload.partnerDetails.zipCode
      });
      form.markAllAsTouched();
    }
  }

  patchCommissionDetails(form: FormGroup, payload) {
    if (payload.partnerDetails && payload.partnerDetails.startDate) {
      const { startDate = null, endDate = null, commissionForPlanners = null, commissionForVendors = null } = payload.partnerDetails;
      const updatePayload = {
        ...showUIDateOFormat(Constants.ADD_PARTNER_DATE_FIELD, {
          startDate, endDate
        }, Constants.DATE_CONFIG.format)
      };
      form.controls.startDate.setValidators([Validators.required]);
      form.patchValue({
        startDate: updatePayload.startDate,
        endDate: updatePayload.endDate,
        commissionForVendors,
        commissionForPlanners
      });
      form.markAllAsTouched();
    }

  }

  addPartner(payload) {
    payload.phone = preparePhoneFormat(payload.phone, payload.phoneCountryCode);
    payload.mobile = preparePhoneFormat(payload.mobile, payload.mobileCountryCode);
    this.loader.start();
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.addPartner, payload)
      .pipe(map(res => {
        this.loader.stop();
        this.partnerDeatils$.next(res.data);
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  updateBasicDetails(payload, partnerId) {
    payload.phone = preparePhoneFormat(payload.phone, payload.phoneCountryCode);
    payload.mobile = preparePhoneFormat(payload.mobile, payload.mobileCountryCode);
    this.loader.start();
    return this.request.patch<IApiSuccess>(`${Constants.ENDPOINTS.addPartner}/${partnerId}`,
      payload)
      .pipe(map(res => {
        this.loader.stop();
        this.partnerDeatils$.next(res.data);
        if (res.data.isProfileCompleted) {
          this.alert.showSuccess(Messages.SUCCESS.partnerDetailsUpdated);
        }
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  updateCommissionDetails(payload, partnerId) {
    let commissionPayload = { ...payload };
    if (moment(commissionPayload.startDate, Constants.DATE_CONFIG.format).isSame(moment(), 'date')) {
      commissionPayload.startDate = moment().add(2, 'minutes');
    }
    commissionPayload = { ...getDatetoISOFormat(Constants.ADD_PARTNER_DATE_FIELD, commissionPayload) };
    this.loader.start();
    return this.request.patch<IApiSuccess>(
      `${Constants.ENDPOINTS.updatePartnerCommission}/${partnerId}`, commissionPayload)
      .pipe(map(res => {
        this.loader.stop();
        this.partnerDeatils$.next(res.data);
        if (res.data.isProfileCompleted) {
          this.alert.showSuccess(Messages.SUCCESS.commissionDetailsUpdated);
        }
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        if (error.error.errors && error.error.errors.msg && error.error.errors.msg[0].msg) {
          this.alert.showError(error.error.errors.msg[0].msg);
        }
        return throwError(error);
      }));
  }

  updateBankDetails(payload, partnerId) {
    payload = { ...mapPartnerBankDetails(payload) };
    this.loader.start();
    return this.request.patch<IApiSuccess>(
      `${Constants.ENDPOINTS.updatePartnerBank}/${partnerId}`, payload)
      .pipe(map(res => {
        this.loader.stop();
        this.alert.showSuccess(Messages.SUCCESS.partnerDetailsAdded);
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  getPartnerDetailsApi(partnerId, params = {}) {
    return this.request.get<IApiSuccess>(
      `${Constants.ENDPOINTS.addPartner}/${partnerId}`, params)
      .pipe(map(res => {
        this.loader.stop();
        this.partnerDeatils$.next(res.data);
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  partnerAnalytics(params) {
    this.loader.start();
    return this.request.get<IApiSuccess>(
      Constants.ENDPOINTS.partnerDashboard, params)
      .pipe(map(res => {
        this.loader.stop();
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  setPartnerDetails(details) {
    this.partnerDeatils$.next(details);
  }

  getPartnerDetails() {
    return this.partnerDeatils$;
  }

  getPartnerName() {
    return this.partnerDeatils$.pipe(map(res => {
      const payload = res as { partnerDetails: { businessName: string } };
      return payload.partnerDetails ? payload.partnerDetails.businessName : '';
    }));
  }

  adminDeletePartnerBank(partnerId) {
    this.loader.start();
    return this.request.delete<IApiSuccess>(`/admin/partners/bankDetails/${partnerId}`)
      .pipe(map(res => {
        this.loader.stop();
        this.alert.showSuccess(Messages.SUCCESS.bankRemoved);
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }
}
