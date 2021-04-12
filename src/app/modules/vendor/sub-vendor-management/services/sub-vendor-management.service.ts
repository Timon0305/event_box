import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/operators';
import { IApiSuccess, IPaginatedData } from '@app/models/IApiResponse';

@Injectable()
export class SubVendorManagementService {

  constructor(readonly request: RequestService) { }

  inviteSubVendor(data) {
    return this.request.post(Constants.ENDPOINTS.subVendors, data).pipe(map(res => res));
  }

  getSubVendorList(page, keyword?: string) {
    let endPoint = `${Constants.ENDPOINTS.subVendors}?page=${page || 1}`;
    if (keyword) {
      endPoint = `${endPoint}&filter=${keyword}&fields=firstName,email,lastName`;
    }
    return this.request.get<IApiSuccess>(endPoint).pipe(map(res => res.data as IPaginatedData));
  }

  changeVendorStatus(data) {
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.changeUserStatus, data).pipe(map(res => res));
  }
}
