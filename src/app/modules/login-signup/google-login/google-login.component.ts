import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginService } from '../services/social-login-service.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VendorSignupComponent } from '../vendor-signup/vendor-signup.component';
import { LoginSignupService } from '../services/login-signup.service';
import { LoaderService } from '@app/core/services/loader.service';
import { Constants } from '@app/config/constant';
import { SelectUserTypeComponent } from '../select-user-type/select-user-type.component';
import { ISocialUser } from '@app/models/ISocialUser';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { PlannerSignupComponent } from '../planner-signup/planner-signup.component';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  providers: [SocialLoginService]
})
export class GoogleLoginComponent implements OnInit, OnDestroy {
  @Input() role: string;
  private readonly destroyed$ = new Subject();
  firstTimeLogin = true;
  socialUser: ISocialUser;

  constructor(
    readonly loader: LoaderService,
    readonly authService: AuthService, readonly modalService: NgbModal, readonly activeModal: NgbActiveModal,
    readonly socialLoginService: SocialLoginService, readonly loginSignupService: LoginSignupService,
    private readonly sessionManagerService: SessionManagerService, private readonly ngbActiveModule: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  googleLogin() {
    this.ngbActiveModule.dismiss();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      if (res.id) {
        this.socialUser = res;
        this.socialUser.accountType = Constants.ACCOUNT_TYPE.GOOGLE;
        this.authenticateUser({ token: res.idToken, accountType: res.provider.toLowerCase(), email: res.email });
        return;
      }
    }).catch(error => this.loader.stop());
  }

  authenticateUser(data: { token: string, accountType: string, email: string }) {
    this.socialLoginService
      .socialSignup({ token: data.token, accountType: data.accountType })
      .pipe(
        takeUntil(this.destroyed$))
      .subscribe(res => {
        if (res.data.token) {
          this.loginPlanner(res);
        } else if (this.role !== Constants.Role.PLANNER && this.role !== Constants.Role.VENDOR && !res.data.token) {
          this.modalService.dismissAll();
          this.isPlannerOrVendor(res);
        } else {
          this.checkRole();
          this.loader.stop();
        }
      }
      );
  }

  isPlannerOrVendor(res) {
    this.firstTimeLogin = false;
    const modalRef = this.modalService.open(SelectUserTypeComponent, { centered: true });
    modalRef.componentInstance.userRole.subscribe(role => {
      this.role = role;
      if (res.data.token) {
        this.authenticateGoogleUser({
          token: res.data.token,
          accountType: res.data.accountType,
          user: res.data.user,
          role: this.role
        });
      } else {
        this.checkRole();
      }
      this.loader.stop();
    });
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
    if (this.role === Constants.Role.PLANNER) {
      this.openPlannerSignup();
    } else {
      this.openVendorSignUp();
    }
  }


  openPlannerSignup() {
    const modalRef = this.modalService.open(PlannerSignupComponent,
      { backdrop: 'static', keyboard: false, centered: true, windowClass: 'planner-signup-modal' });
    modalRef.componentInstance.socialUser = this.socialUser;
  }

  openVendorSignUp() {
    const modalRef = this.modalService.open(VendorSignupComponent, { backdrop: 'static', keyboard: false, size: 'lg', centered: true });
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
