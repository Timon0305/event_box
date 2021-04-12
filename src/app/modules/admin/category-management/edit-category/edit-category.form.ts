import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class EditCategoryFormHelper {

  constructor(private readonly fb: FormBuilder) { }
  // function to build a reactive form
  buildForm() {
    return this.fb.group({
      name: ['', [Validators.required]]
    });
  }
}
