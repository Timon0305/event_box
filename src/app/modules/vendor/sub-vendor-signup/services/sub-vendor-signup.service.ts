import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/operators';
import { IApiSuccess } from '@app/models/IApiResponse';

@Injectable()
export class SubVendorSignupService {

  constructor(readonly request: RequestService) { }

  subVendorSignUp(vendorId: string, data) {
   return  this.request.patch(`${Constants.ENDPOINTS.subVendors}/${vendorId}`, data).pipe(map(res => res));
  }

  checkVendorStatus(vendorId: string) {
    return  this.request.post(`${Constants.ENDPOINTS.isUserExist}`, {id: vendorId}).pipe(map(res => res as IApiSuccess));
   }
}
