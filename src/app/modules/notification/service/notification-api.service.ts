import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class NotificationApiService {
  constructor(
    private readonly request: RequestService) { }
  getNotificationList(params = {}) {
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.notification, params).pipe(map(res => res));
  }

}
