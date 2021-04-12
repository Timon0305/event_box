// only for common functions to be used at vendor

import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/operators';

@Injectable()
export class VendorService {
  constructor(readonly request: RequestService) { }
  getVendorLocations() {
    const params = { limit: Constants.LOCATION_MAX_VENDOR };
    return this.request.get(Constants.ENDPOINTS.locations, params).pipe(map(res => res));
  }

  acceptTerms(payload) {
    return this.request.patch(Constants.ENDPOINTS.acceptTerms, payload).pipe(map(res => res));
  }

  deleteSubscription() {
    return this.request.delete(Constants.ENDPOINTS.deleteSubscription).pipe(map(res => res));
  }
}
