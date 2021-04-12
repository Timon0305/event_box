import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IApiSuccess } from '@app/models/IApiResponse';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@app/modules/login-signup/login/login.component';
import { changeQueryParams } from '@app/core/utils/common.util';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class DetailApiService {

  constructor(
    private readonly request: RequestService,
    private readonly sessionService: SessionManagerService,
    private readonly modalService: NgbModal, private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  getPreQuoteDetails(payload) {
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.preQuotes, payload).pipe(map(res => res));
  }

  isUserLoggedIn(url?) {
    const redirectUri = url ? url : `/details/${this.route.snapshot.params.id}?openSelectEvent=true`;
    return !this.sessionService.getToken() ? this.openLoginPopup(redirectUri) : true;
  }

  openLoginPopup(redirectUri) {
    const modalref = this.modalService.open(LoginComponent, { centered: true, windowClass: 'login-full-modal' });
    modalref.result.catch(() => {
      changeQueryParams({ redirectUri: null }, this.route, this.router);
    });
    changeQueryParams({ redirectUri }, this.route, this.router);
    return false;
  }

  getEventById(eventId) {
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.event}/${eventId}`)
      .pipe(map(res => res.data));
  }
}
