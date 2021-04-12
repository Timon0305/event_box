import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '@modules/login-signup/login/login.component';
import { PlannerSignupComponent } from '@modules/login-signup/planner-signup/planner-signup.component';
import { VendorSignupComponent } from '@modules/login-signup/vendor-signup/vendor-signup.component';
import { ForgotPasswordComponent } from '@modules/auth/forgot-password/forgot-password.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RequestService } from '@app/core/http/request-service';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Constants } from '@app/config/constant';
import { take, takeUntil, filter } from 'rxjs/operators';
import { IBasicUser } from '@app/models/IUserDetails';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from '@environments/environment';
import { CommonService } from '@app/core/services/common/common.service';
import { FirebaseMessageService } from '@app/core/services/firebase-message.service';
import { skipScrollTop, changeQueryParams } from '@app/core/utils/common.util';
import { InvitesOnboardingComponent } from '@app/modules/login-signup/invites-onboarding/invites-onboarding.component';
import { IApiSuccess } from '@app/models/IApiResponse';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  readonly s3BaseUrl = environment.s3BaseUrl;
  appRoutes = Constants.APPLICATION_ROUTES;
  userData: IBasicUser;
  showInitialHeader = false;
  showHeaderSearch = false;
  showHeaderMenu = true;
  constants = Constants;
  onlyLogoHeader = false;
  showHeader = true;
  headerAction = false;
  isHomePage = true;
  headerCount;
  constructor(
    private readonly alert: AlertService,
    private readonly cdr: ChangeDetectorRef,
    private readonly firebaseMesssageService: FirebaseMessageService,
    readonly route: ActivatedRoute, private readonly commonService: CommonService,
    readonly modalService: NgbModal, readonly router: Router,
    readonly sessionService: SessionManagerService, readonly requestService: RequestService,
    private readonly activeModal: NgbActiveModal) {
  }
  ngOnInit() {
    this.detectLogin();
    this.getProfileEvent();
    this.subscribeRouteEvents();
    this.subscribeHeaderCount();
    this.subscribeNotification();
    this.checkForRedirectUriAndOpenLogin();
  }

  detectLogin() {
    this.sessionService.detectLogin().pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.userData = { ...this.userData, token: this.sessionService.getToken() };
      if (this.userData.token) {
        this.firebaseMesssageService.requestPermission();
        this.firebaseMesssageService.receiveMessage();
        this.sessionService.setProfileEvent(true);
      }
    });
  }

  getProfileEvent() {
    this.sessionService.getProfileEvent().pipe(takeUntil(this.destroyed$)).subscribe(event => {
      if (event) {
        this.requestService.get<{ data: IBasicUser }>(Constants.ENDPOINTS.profile).pipe(take(1)).subscribe(userResp => {
          this.sessionService.setUserData(userResp.data);
          this.userData = { ...this.userData, ...userResp.data };
          this.getHeaderCountApi();
          // end above code
        });
      }
    });
  }

  navigateToDashboard(url, dropDown?) {
    this.router.navigate([`${url}`]);
    this.closeDropdown(dropDown);
  }

  subscribeRouteEvents() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.checkForRedirectUriAndOpenLogin();
          this.showHeader = (Constants.SHOW_NO_HEADER.indexOf(event.url.split('?')[0]) < 0);
          this.isOnlyLogoHeader(event);
          this.showInitialHeader = Constants.INITIAL_SIGNUP_PAGES.indexOf(event.url) >= 0;
          const getUrlArray = event.url.split('/', Constants.SEARCH_BAR_URL_SPLIT_LIMIT);
          if (getUrlArray[1] === Constants.SHOW_HEADER_SEARCH_BAR_ROUTE) {
            Constants.SHOW_HEADER_SEARCH_BAR.push(event.url.split('?')[0]);
          }
          this.showHeaderSearch = (Constants.SHOW_HEADER_SEARCH_BAR.indexOf(this.router.url.split('?')[0]) !== -1);
          this.isShowHeaderMenu(event);
          if (!skipScrollTop(event.url)) {
            window.scrollTo(0, 0);
          }
          // header count api call deleted on every route change
        }
      });
  }

  isOnlyLogoHeader(event) {
    for (const pageRoute of Constants.SHOW_HEADER_WITH_LOGO_ONLY) {
      this.onlyLogoHeader = event.url.includes(pageRoute);
      if (this.onlyLogoHeader) {
        break;
      }
    }
  }

  isShowHeaderMenu(event) {
    if (this.router.url !== '/' && this.router.url.split('?')[0] !== '/') {
      this.showHeaderMenu = this.showHeaderSearch;
      this.isHomePage = false;
    } else if (this.router.url.split('?')[0] === '/') {
      this.showHeaderMenu = true;
      this.isHomePage = true;
    }
  }
  signIn() {
    this.modalService.open(LoginComponent, { centered: true, windowClass: 'login-full-modal' }).result.catch(res => {
      if (this.route.snapshot.queryParams.redirectUri) {
        changeQueryParams({ redirectUri: null }, this.route, this.router);
      }
    });
  }

  plannerSignUp() {
    // commented as of now, for future use
    this.modalService.open(PlannerSignupComponent,
      { backdrop: 'static', keyboard: false, centered: true, windowClass: 'planner-signup-modal' });
  }

  vendorSignUp() {
    this.modalService.open(VendorSignupComponent,
      { backdrop: 'static', keyboard: false, size: 'lg', centered: true, windowClass: 'vendor-signup-modal' });
  }

  forgotPassword() {
    this.modalService.open(ForgotPasswordComponent, { size: 'lg', centered: true });
  }

  invitesOnBoarding(userData) {
    if (userData.statusCode === Constants.ERROR_CODES.ENTITY_NOT_FOUND) {
      this.alert.showError(Messages.ERROR.referralDoesNotExist);
    } else if (userData.data.isVerified) {
      this.checkIfPartnerOrVendor(userData);
    } else {
      this.alert.showError(Messages.ERROR.userNotVerified);
    }

  }

  checkIfPartnerOrVendor(userData) {
    if (userData.data.role === Constants.Role.PARTNER || userData.data.role === Constants.Role.VENDOR) {
      this.modalService.open(InvitesOnboardingComponent, {
        backdrop: 'static', keyboard: false, centered: true,
        windowClass: 'user-select-modal'
      }).componentInstance.referrerRole = userData;
    } else {
      this.alert.showError(Messages.ERROR.invalidReferral);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  // logout user
  signOut() {
    this.sessionService.logout();
  }
  moveToProfile(dropDown) {
    this.headerAction = false;
    this.router.navigate(['']);
    if (this.userData.role === Constants.Role.VENDOR) {
      this.router.navigate(['/vendor/profile']);
    } else if (this.userData.role === Constants.Role.PLANNER) {
      this.router.navigate(['/planner/profile']);
    } else if (this.userData.role === Constants.Role.ADMIN) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['']);
    }
    dropDown.close();
  }

  moveToQuotes(dropDown?) {
    this.headerAction = false;
    this.router.navigate(['/vendor/quotes/list'],
      { queryParams: Constants.DEFAULT_SORTING_PARAMS.ACCEPT_REJECT_AND_AWAITING_VENDOR_QUOTES });
    this.closeDropdown(dropDown);
  }

  closeDropdown(dropDown?) {
    if (dropDown) {
      dropDown.close();
    }
  }

  redirectToNewOrders(myDrop?) {
    this.headerAction = false;
    this.router.navigate(['/vendor/orders'], { queryParams: { type: Constants.ORDER_TYPES.NEW_ORDERS } });
    this.closeDropdown(myDrop);
  }

  redirectToDayOut(myDrop?) {
    this.headerAction = false;
    this.router.navigate(['/vendor/orders'], { queryParams: { type: Constants.ORDER_TYPES.DAY_OUR_ORDERS } });
    this.closeDropdown(myDrop);
  }

  addEvent() {
    this.headerAction = false;
    this.router.navigate(['/planner/event/add-event']);
  }

  navigate(url, params?) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.router.navigated = false;
    this.headerAction = false;
    if (!params) {
      this.router.navigateByUrl(url);
    } else {
      this.router.navigate([url], { queryParams: params });
    }

  }

  getHeaderCountApi() {
    if (this.sessionService.getToken()) {
      this.commonService.getHeaderCountApi().pipe(takeUntil(this.destroyed$))
        .subscribe();
    }
  }

  subscribeHeaderCount() {
    this.commonService.getHeaderCount().pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.headerCount = res;
        this.cdr.detectChanges();
      });
  }

  isUserLoggedIn() {
    return this.sessionService.getToken();
  }

  onAddIcon() {
    this.headerAction = !(this.headerAction);
  }

  onCloseDropDown(dropDown) {
    dropDown.close();
  }

  subscribeNotification() {
    this.firebaseMesssageService.getNotification().pipe(takeUntil(this.destroyed$), filter(res => !!res))
      .subscribe(res => {
        this.getHeaderCountApi();
      });
  }

  checkForRedirectUriAndOpenLogin() {
    if (!this.isUserLoggedIn() && this.route.snapshot.queryParams.redirectUri && !this.router.url.includes('admin')) {
      if (!this.activeModal) {
        this.signIn();

      }
    }
    if (!this.isUserLoggedIn() && this.route.snapshot.queryParams.referredBy) {
      this.requestService.post<IApiSuccess>(Constants.ENDPOINTS.isUserExist, {
        id: this.route.snapshot.queryParams.referredBy,
        companyId: this.route.snapshot.queryParams.referredBy
      })
        .pipe(takeUntil(this.destroyed$)).subscribe((res) => this.invitesOnBoarding(res));
    }
  }

}
