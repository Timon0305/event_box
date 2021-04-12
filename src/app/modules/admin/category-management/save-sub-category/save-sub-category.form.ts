import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class SaveSubCategoryFormHelper {

  constructor(private readonly fb: FormBuilder) { }
  // function to build a reactive form
  buildForm() {
    return this.fb.group({
      categoryName: [null, [Validators.required]],
      name: ['', [Validators.required]]
    });
  }
}
