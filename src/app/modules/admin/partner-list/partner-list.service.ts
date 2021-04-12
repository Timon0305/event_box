import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { LoaderService } from '@app/core/services/loader.service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { isAdmin, isVendor, isPartner } from '@app/core/utils/common.util';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';

@Injectable()
export class PartnerListService {

  constructor(
    private readonly alert: AlertService,
    private readonly sessionService: SessionManagerService,
    private readonly request: RequestService, private readonly loader: LoaderService) { }

  getPartnersList(params = {}) {
    return this.getData(Constants.ENDPOINTS.getPartnersList, params);
  }

  getPartnerListForPopup(params = {}) {
    return this.getData(Constants.ENDPOINTS.partnerListForPopup, params);
  }

  getAdminPartnerVendorsList(partnerId, params = {}) {
    return this.getData(`/admin/partners/${partnerId}/vendors`, params);
  }

  getAdminPartnerPlannersList(partnerId, params = {}) {
    return this.getData(`/admin/partners/${partnerId}/planners`, params);
  }

  getVendorInvitesPlannersList(params = {}) {
    return this.getData(`/users/refer/planners`, params);
  }

  getAdminPartnerOrders(partnerId, params = {}) {
    return this.getData(`/admin/partners/${partnerId}/orders`, params);
  }

  getPartnerReferPlanners(params = {}) {
    return this.getData(Constants.ENDPOINTS.partnerReferPlanners, params);
  }

  getPartnerReferVendors(params = {}) {
    return this.getData(Constants.ENDPOINTS.partnerReferVendors, params);
  }

  getPartnerReferOrders(params = {}) {
    return this.getData(Constants.ENDPOINTS.partnerReferOrders, params);
  }

  getData(url, params = {}) {
    this.loader.start();
    return this.request.get<IApiSuccess>(url
      , params)
      .pipe(map(res => {
        this.loader.stop();
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  isAdmin() {
    return isAdmin(this.sessionService.getRole());
  }

  isVendor() {
    return isVendor(this.sessionService.getRole());
  }

  isPartner() {
    return isPartner(this.sessionService.getRole());
  }
  changeAssociation(payload: {
    associatedIds: Array<string>;
    associateTo: string;
    role: string
  }) {
    this.loader.start();
    return this.request.patch<IApiSuccess>(Constants.ENDPOINTS.changeAssociation,
      payload).pipe(
        map(res => {
          const message = payload.associateTo ? Messages.SUCCESS.associationChanged : Messages.SUCCESS.unlinked;
          this.alert.showSuccess(message);
          this.loader.stop();
          return res;
        }),
        catchError(error => {
          this.loader.stop();
          return throwError(error);
        })
      );
  }

  adminDeletePartner(partnerId) {
    this.loader.start();
    return this.request.delete<IApiSuccess>(`/admin/partners/${partnerId}`)
      .pipe(map(res => {
        this.loader.stop();
        return res;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }
}
