import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { Constants } from '@app/config/constant';
import { SocialLoginService } from '../services/social-login-service.service';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { LoaderService } from '@app/core/services/loader.service';
import { ISocialUser } from '@app/models/ISocialUser';
import { Subject } from 'rxjs/internal/Subject';
import { LoginSignupService } from '../services/login-signup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlannerSignupComponent } from '../planner-signup/planner-signup.component';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  providers: [SocialLoginService]
})
export class FacebookLoginComponent implements OnInit, OnDestroy {
  @Input() role: string;
  socialUser: ISocialUser;
  private readonly destroyed$ = new Subject();
  firstTimeLogin = true;

  constructor(
    readonly authService: AuthService,
    readonly socialLoginService: SocialLoginService,
    readonly sessionManagerService: SessionManagerService,
    readonly loader: LoaderService,
    private readonly loginSignupService: LoginSignupService,
    readonly modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  facebookLogin() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      if (res.facebook.id) {
        this.socialUser = res;
        this.socialUser.accountType = Constants.ACCOUNT_TYPE.FACEBOOK;
        this.authenticateUser({ token: res.authToken, accountType: res.provider.toLowerCase(), email: res.email });
        return;
      }
    }).catch(error => {});
  }

  authenticateUser(data: { token: string, accountType: string, email: string }) {
    this.socialLoginService
      .socialSignup({ token: data.token, accountType: data.accountType })
      .pipe(
        takeUntil(this.destroyed$))
          .subscribe(res => {

            if ((this.role === Constants.Role.PLANNER) && res.data.token) {
              this.loginPlanner(res);
            } else {
              this.checkRole();
              this.loader.stop();
            }
      }
    );
  }

  loginPlanner(res) {
    this.role = res.data.user.role;
    this.authenticateGoogleUser({
      token: res.data.token,
      accountType: res.data.user.accountType,
      user: res.data.user,
      role: res.data.user.role, userId: res.data.user._id
    });
  }

  checkRole() {
      this.openPlannerSignup();
  }

  openPlannerSignup() {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(PlannerSignupComponent,
      { backdrop: 'static', keyboard: false, centered: true, windowClass: 'planner-signup-modal' });
    modalRef.componentInstance.socialUser = this.socialUser;
  }

  authenticateGoogleUser(data: { token: string, accountType: string, user, role: string, userId?: string }) {
    if (data.token) {
      this.sessionManagerService.createSession(data.token, data.role, data.userId);
      this.loader.stop();
      this.loginSignupService.navigateuserByStatus(data.user);
      this.loader.stop();
    }
  }



  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
