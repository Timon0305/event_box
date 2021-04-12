import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestService } from '@app/core/http/request-service';
import { CustomValidator } from '@app/core/validators/custom-validator';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/operators';
import { websiteValidator, instaValidator } from '@app/core/validators/website.validator';
import { preparePhoneFormat, getCountryCodeAndPhone } from '@app/core/utils/common.util';
import { IApiSuccess } from '@app/models/IApiResponse';

@Injectable()
export class ProfileService {

  constructor(readonly fb: FormBuilder, readonly request: RequestService) { }

  createVendorDetailForm() {
    return this.fb.group({
      logo: [''],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      companyName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])],
      countryCode: [null, Validators.compose([Validators.required])],
      instagram: ['', Validators.compose([instaValidator])],
      website: ['', Validators.compose([websiteValidator])],
      facebook: ['', Validators.compose([websiteValidator])],
    });
  }

  uploadVendorLogo(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.uploadVendorLogo, formData, true).pipe(map(res => res));

  }

  createBankDetailForm() {
    return this.fb.group({
      account_holder_name: ['', Validators.compose([Validators.required])],
      account_number: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
      bank_name: ['', Validators.compose([Validators.required])],
      cnfirmAccNumber: ['', Validators.compose([Validators.required])],
      routing_number: ['', Validators.compose([Validators.required])],
      confirmRoutingNumber: ['', Validators.compose([Validators.required])],
      tax_id: ['', Validators.compose([Validators.required])],
      confirmTaxId: ['', Validators.compose([Validators.required])]
    },
      {
        validator: [CustomValidator.matchAccountNumber.bind(this),
        CustomValidator.matchRoutingNumber.bind(this),
        CustomValidator.matchTaxId.bind(this)]
      });
  }

  updateVendorProfile(payload) {
    return this.request.post(Constants.ENDPOINTS.profileVendor, payload).pipe(map(res => res));
  }

  updateProfile(payload) {
    payload.phone = preparePhoneFormat(payload.phone, payload.countryCode);
    return this.request.patch(Constants.ENDPOINTS.profileVendor, payload).pipe(map(res => res));
  }

  updateProfileForm(form, user) {
    if (user.email) {
      const { phone, countryCode } = getCountryCodeAndPhone(user.company.phone);
      if (user && user.firstName) {
        form.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone,
          instagram: user.company.instagram,
          website: user.company.website,
          facebook: user.company.facebook,
          companyName: user.company.name,
          countryCode
        });
      }
    }

  }

  getVendorProfileLocations() {
    const params = { limit: Constants.LOCATION_MAX_VENDOR };
    return this.request.get(Constants.ENDPOINTS.locations, params).pipe(map(res => res));
  }

  updateBankDetails(formValue) {
    return this.request.post(Constants.ENDPOINTS.createBankDetail, formValue).pipe(map(res => res));
  }

  skipDetails() {
    return this.request.patch(Constants.ENDPOINTS.skipBankDetails).pipe(map(res => res));
  }

  adminUpdateLogo(id, file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request.post<IApiSuccess>(`${Constants.ENDPOINTS.adminUploadImage}/${id}`, formData).pipe(map(res => res));
  }

  patchBankDetailForm(form: FormGroup, bankDetails) {
    form.patchValue({
      account_holder_name: bankDetails.accountHolderName,
      account_number: bankDetails.accountNumber,
      bank_name: bankDetails.bankName,
      cnfirmAccNumber: bankDetails.accountNumber,
      routing_number: bankDetails.routingNumber,
      confirmRoutingNumber: bankDetails.routingNumber,
      tax_id: bankDetails.tax_id,
      confirmTaxId: bankDetails.tax_id,
    });
  }
}
