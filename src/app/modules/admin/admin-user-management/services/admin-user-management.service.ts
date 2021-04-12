import { Injectable } from '@angular/core';
import { RequestService } from '@core/http/request-service';
import { Constants } from '@app/config/constant';
import { IApiSuccess } from '@app/models/IApiResponse';
import { map } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { preparePhoneFormat } from '@app/core/utils/common.util';

@Injectable()
export class AdminUserManagementService {
    constructor(
        private readonly requestService: RequestService,
        private readonly router: Router,
        private readonly loaderService: LoaderService
    ) { }

    getUserList(paramsReceived?: Params) {
        this.loaderService.start();
        const vendorListUrl = `${Constants.ENDPOINTS.adminUserManagement}`;
        return this.requestService.get<IApiSuccess>(vendorListUrl, paramsReceived)
            .pipe(
                map(res => {
                    this.loaderService.stop();
                    return res.data;
                }
                )
            );
    }

    redirect(params) {
        this.router.navigate([`/admin/user-management`], { queryParams: params });
    }

    deleteAdminUser(id: string) {
        return this.requestService.delete(`${Constants.ENDPOINTS.adminUserManagement}/${id}`);
    }

    addAdminUser(data) {
        data.phone = preparePhoneFormat(data.phone, data.countryCode);
        return this.requestService.post(`${Constants.ENDPOINTS.adminUserManagement}`, data);
    }

    updateAdminUser(id: string, data) {
        data.phone = preparePhoneFormat(data.phone, data.countryCode);
        return this.requestService.put(`${Constants.ENDPOINTS.adminUserManagement}/${id}`, data);
    }

    getAdminUser(id: string) {
        return this.requestService.get<IApiSuccess>(`${Constants.ENDPOINTS.adminUserManagement}/${id}`).pipe(map(res => res.data));
    }

    changeAdminUserStatus(id: string, status) {
        return this.requestService.patch(`${Constants.ENDPOINTS.adminUserManagement}/${id}/status`, { status });
    }
}
