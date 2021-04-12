import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionManagerService } from '@core/services/session/session-manager.service';
import { LoaderService } from '@core/services/loader.service';
import { Constants } from '@app/config/constant';
import { Router } from '@angular/router';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private readonly sessionManagerService: SessionManagerService,
    private readonly loaderService: LoaderService,
    private readonly router: Router, private readonly alert: AlertService
  ) { }

  intercept(
    request: HttpRequest<Request>,
    next: HttpHandler
  ) {
    const token = this.sessionManagerService.getToken();
    if (token) {
      this.sessionManagerService.updateCookieTime();
    }
    request = request.clone({
      headers: request.headers.set('Authorization', `${'Bearer '}${token}`)
        .set('Accept', 'application/json')
        .set('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone || '')
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        .set('If-Modified-Since', '0')
    });
    return next.handle(request).pipe(
      tap(
        event => {
        },
        error => {
          switch (error.status) {
            case Constants.ERROR_CODES.UNATHOURIZED:
              this.sessionManagerService.logout('', false);
              this.alert.showError(`${Messages.ERROR.notAuthorized}`);
              this.router.navigateByUrl('/');
              break;
            case Constants.ERROR_CODES.BAD_REQUEST:
              if (error.error.errors.msg.indexOf(Constants.PROMO_CODE.minCartValueErrortype) >= 0) {
                const value = error.error.errors.msg.split('_').slice(-1).pop();
                this.alert.showError(`${Messages.ERROR.minimumCartThreshold(value)}`);
              } else {
                this.handleBadRequest(error.error.errors);
              }
              break;
            case Constants.ERROR_CODES.UNREACHABLE:
              this.alert.showError(`${Messages.ERROR.unreachableServer}`);
              break;
            case Constants.ERROR_CODES.INTERNAL_SERVER_ERROR:
              this.alert.showError(`${Messages.ERROR.unreachableServer}`);
              break;
            case Constants.ERROR_CODES.NOTFOUND:
              this.handleBadRequest(error.error.errors);
              break;
            case Constants.ERROR_CODES.UNAUTHENTICATED:
              this.handleBadRequest(error.error.errors);
          }
        }
      )
    );
  }

  handleBadRequest(error) {
    if (Messages.ERROR_TYPES[error.msg]) {
      this.alert.showError(Messages.ERROR_TYPES[error.msg]);
    } else {
      this.alert.showError(`${Messages.ERROR_TYPES[error.msg[0].msg]}`);
    }
  }
}
