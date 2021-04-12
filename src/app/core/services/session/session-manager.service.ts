import { Injectable } from '@angular/core';

// Services
import { CookieManagerService } from './cookie-manager.service';
import { Router } from '@angular/router';
import { RequestService } from '@core/http/request-service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { IBasicUser } from '@app/models/IUserDetails';
import { map } from 'rxjs/internal/operators/map';
import { Constants } from '@app/config/constant';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {
  readonly logoutBehaviour = new BehaviorSubject<boolean>(false);
  readonly loginBehaviour = new BehaviorSubject<boolean>(true);
  readonly getProfile = new BehaviorSubject<boolean>(false);
  readonly user = new BehaviorSubject<IBasicUser | {}>({});
  resetSearchFilter$ = new BehaviorSubject<boolean>(false);
  setCurrentLocationForSearch$ = new BehaviorSubject<{[index: string]: string}>({});
  locationResetFilter$ = new BehaviorSubject<boolean>(false);
  constructor(
    readonly cookieManager: CookieManagerService,
    readonly alertService: AlertService, readonly request: RequestService, readonly router: Router,
  ) { }

  public createSession = (token: string, role: string, userId?: string) => {
    this.cookieManager.setCookie('token', token);
    this.cookieManager.setCookie('role', role);
    if (userId) {
      this.cookieManager.setCookie('usrId', userId);
    }
    this.loginBehaviour.next(true);
  }

  public isSession = () => {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public getToken = () => {
    return this.cookieManager.getCookie('token');
  }

  public getRole = () => {
    return this.cookieManager.getCookie('role');
  }

  public getUserId = () => {
    return this.cookieManager.getCookie('usrId');
  }
  public removeCookies() {
    this.cookieManager.clearAllCookies();
  }

  public getTokenAndRole = () => {
    return { token: this.cookieManager.getCookie('token'), roleType: this.cookieManager.getCookie('role') };
  }

  public generateGUID() {
    const nav = window.navigator;
    const screen = window.screen;
    const navMimeLength = nav.mimeTypes.length;
    const userAgent = nav.userAgent.replace(/\D+/g, '');
    const pluginLength = nav.plugins.length;
    const screenHeight = screen.height || '';
    const screenWidth = screen.width || '';
    const screenPixelDepth = screen.pixelDepth || '';
    const timeStamp = (new Date()).getTime();
    const rand = Math.random();
    return `${navMimeLength}${userAgent}${pluginLength}${screenHeight}${screenWidth}${screenPixelDepth}${timeStamp}${rand}`;
  }

  public addGUID() {
    if (!this.isGuidSet()) {
      this.cookieManager.setCookie('GUID', this.generateGUID());
    }
  }

  public getGUID() {
    return this.cookieManager.getCookie('GUID');
  }

  public isGuidSet() {
    return this.getGUID();
  }

  logout(message = '', navigate = true) {
    const loggedInRole = this.getRole();
    this.removeCookies();
    this.loginBehaviour.next(true);
    if (navigate) {
      if (loggedInRole === Constants.Role.ADMIN) {
        this.router.navigate(['/admin/login']);
      } else {
        this.router.navigate(['/']);
      }
    }
    if (message) {
      this.alertService.showError(message);
    }
  }

  detectLogout() {
    return this.logoutBehaviour.asObservable();
  }

  setLogout(status: boolean) {
  }

  detectLogin() {
    return this.loginBehaviour.asObservable();
  }

  public updateCookieTime() {
    this.cookieManager.updateCookieTime();
  }

  setUserData(user) {
    this.user.next(user);
  }

  getUserData() {
    return this.user as Observable<IBasicUser>;
  }

  getBadges(quoteType) {
    return this.user.pipe(map((res) => {
      const userResp = res as IBasicUser;
      return (userResp.badges && userResp.badges.Quotes.find(({ _id }) => _id === quoteType) || null);
    }));
  }

  getProfileEvent() {
    return this.getProfile.asObservable();
  }

  setProfileEvent(event) {
    this.getProfile.next(true);
  }

  setResetFilter(value) {
    this.resetSearchFilter$.next(true);
  }

  getResetFilter() {
    return this.resetSearchFilter$;
  }

  getCurrentLocaton() {
    return this.setCurrentLocationForSearch$;
  }

  setCurrentLocaton(location) {
    this.setCurrentLocationForSearch$.next(location);
  }

  public setNotificationToken(token) {
    this.cookieManager.setCookie('notification-token', token);
  }

  public getNotificationToken() {
    return this.cookieManager.getCookie('notification-token');
  }

  setStaySignIn(status) {
    this.cookieManager.setStaySignIn(status);
  }
}
