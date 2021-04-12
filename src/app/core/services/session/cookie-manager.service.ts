import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@environments/environment';
import * as moment from 'moment';
import { Constants } from '@app/config/constant';


@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {
  staySignInStatus = false;
  constructor(readonly cookieService: CookieService) { }

  public setCookie = (key: string, value: string) => {
    const cookieOptions = this.getCookieOptions();
    this.cookieService.set(key, value, cookieOptions.expires,
      cookieOptions.path, cookieOptions.domain, cookieOptions.secure, 'Lax');
  }

  public getCookie = (key: string) => this.cookieService.get(key);

  public clearCookie = (key: string) => {
    this.cookieService.delete(key);
  }

  public clearAllCookies = () => {
    this.cookieService.deleteAll(this.getCookieOptions().path, this.getCookieOptions().domain);
  }

  public updateCookieTime = () => {
    Constants.BROWSER_COOKIES_KEY.forEach((key: string) => {
      this.cookieService.set(key, this.getCookie(key), this.getCookieOptions().expires,
        this.getCookieOptions().path, this.getCookieOptions().domain, this.getCookieOptions().secure);
    });
  }

  getCookieOptions() {
    const expires = this.staySignInStatus ?
      moment().add(Constants.STAY_SIGN_IN_DAYS, 'days').toDate()
      : moment().add(Constants.TWENTYFOUR, 'hours').toDate();
    return {
      domain: window.location.hostname,
      secure: environment.secure,
      path: '/',
      expires
    };
  }

  setStaySignIn(status) {
    this.staySignInStatus = status;
  }
}
