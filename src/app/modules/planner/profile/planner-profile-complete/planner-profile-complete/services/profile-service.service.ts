import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestService } from '@app/core/http/request-service';
import { websiteValidator } from '@app/core/validators/website.validator';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { preparePhoneFormat, getCountryCodeAndPhone } from '@app/core/utils/common.util';

@Injectable()
export class ProfileServiceService {

  constructor(readonly fb: FormBuilder, readonly request: RequestService) { }

  createProfileForm() {
    return this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      companyName: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: [''],
      companyWebsiteUrl: ['', Validators.compose([websiteValidator])],
      companyPhone: [''],
      phoneCountryCode: [Constants.DEFAULT_COUNTRY_CODE],
      companyPhoneCountryCode: [Constants.DEFAULT_COUNTRY_CODE]

    });
  }

  skipPlannerProfile() {
    return this.request.patch(Constants.ENDPOINTS.skipPlannerProfile).pipe(map(res => res));
  }

  updatePlannerProfile(form, user) {
    const userPhoneData = getCountryCodeAndPhone(user.phone);
    const companyPhoneData = getCountryCodeAndPhone(user.companyPhone);
    if (user && user.firstName) {
      form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: userPhoneData.phone,
        companyPhone: companyPhoneData.phone,
        companyWebsiteUrl: user.companyWebsiteUrl,
        companyName: user.companyName,
        phoneCountryCode: userPhoneData.countryCode,
        companyPhoneCountryCode : companyPhoneData.countryCode
      });
    }
  }

  createPlannerProfile(payload) {
    payload.phone =  preparePhoneFormat(payload.phone, payload.phoneCountryCode);
    payload.companyPhone = preparePhoneFormat(payload.companyPhone, payload.companyPhoneCountryCode);
    return this.request.patch(Constants.ENDPOINTS.plannerProfile, payload).pipe(map(res => res));
  }
}
