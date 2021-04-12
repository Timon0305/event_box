import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { updateDatesForEventInIsoFormat } from '@app/core/utils/common.util';

@Injectable()
export class VariableInfoApiService {

  constructor(private readonly request: RequestService) { }

  addQuote(formValue) {
    const payload = updateDatesForEventInIsoFormat({...formValue});
    return this.request.post(Constants.ENDPOINTS.quotes, payload).pipe(map(res => res));
  }

  updateQuoteData(formValue, quoteId) {
    const payload = updateDatesForEventInIsoFormat({...formValue});
    return this.request.patch(`${Constants.ENDPOINTS.quotes}/${quoteId}`, payload).pipe(map(res => res));
  }

}
