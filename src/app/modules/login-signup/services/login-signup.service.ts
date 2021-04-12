import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '@app/config/constant';
import { RequestService } from '@app/core/http/request-service';
import { createPasswordControl } from '@app/core/utils/form.util';
import { CustomValidator } from '@app/core/validators/custom-validator';
import { ForgotPassword, ILoginDetails, IUserDetails, ResetPassword } from '@models/IUserDetails';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/internal/operators/map';
import { VerificationPendingComponent } from '../verification-pending/verification-pending.component';
import { websiteValidator, instaValidator } from '@app/core/validators/website.validator';
import { IApiSuccess } from '@app/models/IApiResponse';
import { isPlanner, isVendor, preparePhoneFormat } from '@app/core/utils/common.util';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';

@Injectable()
export class LoginSignupService {

  constructor(
    private readonly route: ActivatedRoute,
    readonly router: Router, readonly modalService: NgbModal,
    readonly formBuilder: FormBuilder, readonly request: RequestService,
    private readonly alert: AlertService) { }

  login(data: ILoginDetails) {
    return this.request.post<IUserDetails>(`${Constants.ENDPOINTS.login}`, data).pipe(map(res => res));
  }
  forgot(data: ForgotPassword) {
    return this.request.post<IApiSuccess>(`${Constants.ENDPOINTS.forgotPassword}`, data).pipe(map(res => res));
  }

  resetPassword(data: ResetPassword) {
    return this.request.post<ResetPassword>(`${Constants.ENDPOINTS.resetPassword}`, data).pipe(map(res => res));
  }

  verifyUser(payload) {
    return this.request.post(`${Constants.ENDPOINTS.verifyPlanner}`, payload).pipe(map(res => res));
  }

  checkExpiry(id) {
    return this.request.get(`${Constants.ENDPOINTS.verifyToken}/${id}`).pipe(map(res => res));
  }

  createVendorSignupForm() {
    return this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, CustomValidator.validEmail])],
      companyName: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      website: ['', Validators.compose([websiteValidator])],
      instagram: ['', Validators.compose([instaValidator])],
      facebook: ['', Validators.compose([websiteValidator])],
      password: createPasswordControl(),
      passwordConfirmation: createPasswordControl(),
      accountType: [''],
      token: [''],
      countryCode: [Constants.DEFAULT_COUNTRY_CODE]
    },
      {
        validator: CustomValidator.matchPassword.bind(this)
      });
  }

  createPlannerSignUpForm() {
    return this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, CustomValidator.validEmail])],
      staySignIn: [false, Validators.compose([Validators.required])],
      password: createPasswordControl(),
      passwordConfirmation: createPasswordControl(),
      accountType: [''],
      token: ['']
    },
      {
        validator: CustomValidator.matchPassword.bind(this)
      });

  }

  setEmailControl(form, email) {
    if (email) {
      form.controls.email.setValue(email);
    }
  }
  vendorSignup(payload, referredBy) {
    const url = this.getSignupUrl(Constants.ENDPOINTS.nativeSignup, referredBy);
    payload.phone = preparePhoneFormat(payload.phone, payload.countryCode);
    return this.request.post<IUserDetails>(url, payload).pipe(map(res => res));
  }

  plannerSignup(payload, referredBy) {
    const url = this.getSignupUrl(Constants.ENDPOINTS.plannerSignUp, referredBy);
    return this.request.post<IApiSuccess>(url, payload).pipe(map(res => res));
  }

  getSignupUrl(url, referredBy) {
    if (referredBy) {
      url = `${url}?referredBy=${referredBy}`;
    }
    return url;
  }

  createForgotForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  createResetPasswordForm() {
    return this.formBuilder.group({
      password: createPasswordControl(),
      passwordConfirmation: createPasswordControl()
    },
      {
        validator: CustomValidator.matchPassword.bind(this)
      });
  }

  navigateuserByStatus(user) {
    if (user.role === Constants.Role.ADMIN || user.role === Constants.Role.SUB_ADMIN) {
      this.navigatePlanner('/admin');
    } else if (user.company && !user.company.isAdminVerified) {
      this.openVerificationPending();
      this.modalService.dismissAll();
    } else if (user.company && !user.company.isTermsAccepted && user.role !== Constants.Role.PLANNER) {
      return this.navigateUser('vendor/terms-of-service');
    } else if ((user.company && user.company.profileCompleteStatus) || user.isProfileCompleted) {
      // when profile is completed
      this.navigateToDashboard(user);
    } else {
      this.navigateToCompleteProfile(user);
    }
  }

  navigateToCompleteProfile(user) {
    if (isVendor(user.role)) {
      return this.navigateUser('vendor/complete-profile/vendor-detail').then(res => this.modalService.dismissAll());
    } else if (isPlanner(user.role)) {
      return this.navigatePlanner('planner/complete-profile').then(res => this.modalService.dismissAll());
    }
    this.alert.showError(Messages.ERROR.roleNavigationNotDefined);
    this.modalService.dismissAll();
  }

  navigateUser(route) {
    return this.router.navigate([route], { queryParams: { ...this.route.snapshot.queryParams, redirectUri: null,
       referredBy: null } }).then(res => {
      this.modalService.dismissAll();
    });
  }

  navigateToDashboard(userData) {
    if (isVendor(userData.role)) {
      return this.navigatePlanner('vendor/dashboard');
    } else if (isPlanner(userData.role)) {
      return this.navigatePlanner('planner/dashboard');
    } else if (userData.role === Constants.Role.PARTNER) {
      return this.navigatePlanner('partner');
    }
    this.alert.showError(Messages.ERROR.roleNavigationNotDefined);
  }

  navigatePlanner(route) {
    // if planner navigateOnSame is true then do not navigate user
    return this.route.snapshot.queryParams.redirectUri ?
      this.router.navigateByUrl(this.route.snapshot.queryParams.redirectUri).then(res => this.modalService.dismissAll()) :
      this.navigateUser(route);
  }


  openVerificationPending() {
    return this.modalService.open(VerificationPendingComponent, { backdrop: 'static', centered: true, windowClass: 'verify-email-modal' });
  }

  resendEmail(payload) {
    return this.request.post<IUserDetails>(Constants.ENDPOINTS.resendEmail, payload).pipe(map(res => res));
  }
}
