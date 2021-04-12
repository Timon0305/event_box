import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';

@Injectable()
export class SupportService {
    constructor(
        private readonly requestService: RequestService
    ) {}

    sendSupportMessage(data) {
        return this.requestService.post<IApiSuccess>(Constants.ENDPOINTS.support, data);
    }
}
