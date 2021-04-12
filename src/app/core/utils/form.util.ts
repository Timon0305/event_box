import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { IBasicUser } from '@models/IUserDetails';
import * as moment from 'moment';

export const createPasswordControl = () => {
  return new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(Constants.password.minLength),
    Validators.pattern(Constants.password.pattern)
  ]));
};

export const updateSignupForm = (form: FormGroup, data) => {
  form.patchValue({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    staySignIn: false,
    accountType: data.accountType,
    token: data.idToken || data.authToken

  });

};


export const clearFormArray = (formArray: FormArray) => {
  while (formArray.length !== 0) {
    formArray.removeAt(0);
  }
};

const getStartDate = (control) => {
  return control.startDate.value ? moment(control.startDate.value, Constants.DATE_PICKER_CONFIG.format).format('MMDDYYYY') : '';

};

const getEndDate = (control) => {
  return control.endDate.value ? moment(control.endDate.value, Constants.DATE_PICKER_CONFIG.format).format('MMDDYYYY') : '';
};

export const updateEventLabel = (form: FormGroup) => {
  const control = form.controls;
  const nameValue = control.name.value.replace(/[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/g, '').toLowerCase().replace(/ /g, '');
  let generatedLabel = '';
  if (control.startDate.value && control.endDate.value) {
    generatedLabel = nameValue ? `${nameValue}_${getStartDate(form.controls)}_${getEndDate(form.controls)}` :
      `${getStartDate(form.controls)}_${getEndDate(form.controls)}`;
    form.patchValue({ label: generatedLabel });
  } else if (control.startDate.value && !control.endDate.value) {
    generatedLabel = nameValue ? `${nameValue}_${getStartDate(form.controls)}` : `${getStartDate(form.controls)}`;
    form.patchValue({ label: generatedLabel });
  } else {
    generatedLabel = nameValue ? `${nameValue}_${getEndDate(form.controls)}` : `${getEndDate(form.controls)}`;
    form.patchValue({ label: generatedLabel });
  }
};


