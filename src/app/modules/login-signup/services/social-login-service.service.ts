import { Injectable, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { environment } from '@environments/environment';
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RequestService } from '@core/http/request-service';
import { IApiSuccess } from '@models/IApiResponse';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserDetails } from '@app/models/IUserDetails';
export function getAuthServiceConfigs() {
  return new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.social.FacebookAppId)
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.social.GoogleClientId)
    }
  ]);
}
@Injectable()
export class SocialLoginService implements OnDestroy {
  private readonly destroyed$ = new Subject();

  constructor(
    readonly requestService: RequestService, readonly router: Router,
    readonly modalService: NgbModal, readonly activeModal: NgbActiveModal) { }

  public static provideConfig() {

  }

  authenticateGoogleUser(data: { token: string, accountType: string, role: string }) {
    return this.requestService.post<IUserDetails>(Constants.ENDPOINTS.socialLogin, data);
  }

  checkIfUserExists(email: string) {
    return this.requestService.post<IApiSuccess>(Constants.ENDPOINTS.isUserExist, {email});
  }

  socialSignup(data: { token: string, accountType: string}) {
    return this.requestService.post<IApiSuccess>(Constants.ENDPOINTS.socialSignup, data);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
