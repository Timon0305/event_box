import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { createPasswordControl } from '@app/core/utils/form.util';
import { CustomValidator } from '@app/core/validators/custom-validator';

@Injectable()
export class SubVendorSignupFormHelper {

  constructor(private readonly fb: FormBuilder) { }
  // function to build a reactive form
  buildForm() {
    return this.fb.group({
            firstName: ['', Validators.compose([Validators.required])],
            lastName: ['', Validators.compose([Validators.required])],
            password: createPasswordControl(),
            passwordConfirmation: createPasswordControl()
        },
        {
            validator: CustomValidator.matchPassword.bind(this)
        }
    );
  }
}
