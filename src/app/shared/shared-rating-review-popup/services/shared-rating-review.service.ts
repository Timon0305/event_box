import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RequestService } from '@app/core/http/request-service';
import { CustomValidator } from '@app/core/validators/custom-validator';

@Injectable()

export class SharedRatingReviewService {

  constructor(private readonly fb: FormBuilder,
              private readonly request: RequestService) { }

  createRatingForm() {
    return this.fb.group({
      rating: ['', [Validators.required]],
      review: ['', [Validators.required, CustomValidator.noWhitespaceValidator]]
    });
  }
}
