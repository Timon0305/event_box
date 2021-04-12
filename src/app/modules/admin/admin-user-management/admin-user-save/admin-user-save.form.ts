import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '@app/config/constant';

@Injectable()
export class AdminUserSaveFormHelper {

  constructor(private readonly fb: FormBuilder) { }
  // function to build a reactive form
  buildForm() {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'),
      Validators.minLength(Constants.NUMBER.ten),
      Validators.maxLength(Constants.NUMBER.ten)]],
      countryCode: [Constants.DEFAULT_COUNTRY_CODE]
    });
  }
}
