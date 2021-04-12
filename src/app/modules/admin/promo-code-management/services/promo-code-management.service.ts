import { Injectable } from '@angular/core';
import { RequestService } from '@core/http/request-service';
import { Constants } from '@app/config/constant';
import { IApiSuccess } from '@app/models/IApiResponse';
import { map } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import * as moment from 'moment';

@Injectable()
export class PromoCodeManagementService {

  constructor(
    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly loaderService: LoaderService
  ) { }

  getPromoCodeList1() {
    return this.requestService.get<IApiSuccess>(`${Constants.ENDPOINTS.adminPromoCodes}`)
      .pipe(
        map(res => {
          return res.data;
        }
        )
      );
  }

  getPromoCodeList(paramsReceived = {}) {
    this.loaderService.start();
    const promoCodeListUrl = `${Constants.ENDPOINTS.adminPromoCodes}`;
    const params: Params = { ...paramsReceived };
    if (params.order < 1) {
      params.sort = `-${params.sort}`;
    }

    return this.requestService.get<IApiSuccess>(promoCodeListUrl, paramsReceived)
      .pipe(
        map(res => {
          this.loaderService.stop();
          return res.data;
        }
        )
      );
  }

  redirect(params) {
    this.router.navigate([`/admin/promo-code-management`], { queryParams: params });
  }

  deletePromoCode(id: string) {
    return this.requestService.delete(`${Constants.ENDPOINTS.adminPromoCodes}/${id}`);
  }

  getPromoCode(id: string) {
    return this.requestService.get<IApiSuccess>(`${Constants.ENDPOINTS.adminPromoCodes}/${id}`).pipe(map(res => res.data));
  }

  addPromoCode(data) {
    return this.requestService.post(`${Constants.ENDPOINTS.adminPromoCodes}`, data);
  }

  updatePromoCode(id: string, data) {
    return this.requestService.put(`${Constants.ENDPOINTS.adminPromoCodes}/${id}`, data);
  }

  getAllAssociatedVendor(params?: Params) {
    const associatedVendorUrl = `${Constants.ENDPOINTS.adminVendorManagement}`;
    return this.requestService.get<IApiSuccess>(associatedVendorUrl, params).pipe(map(res => res.data));
  }

  patchDateForUI(form, formValue) {
    form.patchValue(formValue);
    Object.keys(Constants.PROMO_CODE_DATE_FIELD).forEach(key => {
      if (formValue[key]) {
        form.controls[key].setValue(moment(formValue[key]).format('MM-DD-YYYY'));
      }
    });
  }

}
