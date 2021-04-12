import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { RequestService } from '@app/core/http/request-service';
import { CustomValidator } from '@app/core/validators/custom-validator';
import { IApiSuccess } from '@app/models/IApiResponse';

@Injectable()
export class AddEditCardDetailsService {

  constructor(readonly fb: FormBuilder, readonly request: RequestService) { }

  createCardForm() {
    return this.fb.group({
      cardHolderName: ['', Validators.compose([Validators.required])],
      cardNumber: ['',  Validators.compose([Validators.required])],
      cvv: ['',  Validators.compose([Validators.required, CustomValidator.validateCVV])],
      month: [null,  Validators.compose([Validators.required])],
      year: [null,  Validators.compose([Validators.required])],
      address: ['',  Validators.compose([Validators.required])],
      city: ['',  Validators.compose([Validators.required])],
      state: [null,  Validators.compose([Validators.required])],
      zipcode: ['',  Validators.compose([Validators.required])],
    },
    {
      validator: CustomValidator.validMonthYear.bind(this)
    });
  }

  createCardDetails(payload) {
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.createCardDetails, payload).pipe(map(res => res));
  }

  payVendorSetupFees(payload) {
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.paySetUpFee, payload).pipe(map(res => res));
  }
}
