import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class HelperService {

  constructor(private readonly fb: FormBuilder,
              private readonly request: RequestService) { }

  createReasonForm() {
    return this.fb.group({
      notes: ['', Validators.compose([Validators.required])],
      wantCuonterOffer: [false]
    });
  }

  updateQuoteStatus(options) {
    return this.request.patch(Constants.ENDPOINTS.updateQuoteStatus, options).pipe(map(res => res));
  }
}
