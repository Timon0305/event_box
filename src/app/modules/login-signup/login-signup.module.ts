import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@app/modules/login-signup/login/login.component';
import { VendorSignupComponent } from '@app/modules/login-signup/vendor-signup/vendor-signup.component';
import { PlannerSignupComponent } from '@app/modules/login-signup/planner-signup/planner-signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleLoginComponent } from '@app/modules/login-signup/google-login/google-login.component';
import { FacebookLoginComponent } from '@app/modules/login-signup/facebook-login/facebook-login.component';
import { FormLoginComponent } from '@app/modules/login-signup/form-login/form-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { getAuthServiceConfigs } from './services/social-login-service.service';
import { LoginSignupService } from './services/login-signup.service';
import { NgxMaskModule } from 'ngx-mask';
import { VerificationPendingComponent } from './verification-pending/verification-pending.component';
import { SelectUserTypeComponent } from './select-user-type/select-user-type.component';
import { ForgotPasswordComponent } from '@app/modules/auth/forgot-password/forgot-password.component';
import { ForgotSuccessComponent } from '@modules/auth/forgot-success/forgot-success.component';
import { PlannerPendingEmailComponent } from './planner-pending-email/planner-pending-email.component';
import { CountryCodeInputModule } from '@app/shared/country-code-input/country-code-input.module';
import { InvitesOnboardingComponent } from './invites-onboarding/invites-onboarding.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent, VendorSignupComponent, PlannerSignupComponent, FacebookLoginComponent,
    GoogleLoginComponent, VerificationPendingComponent, FormLoginComponent, SelectUserTypeComponent,
    ForgotPasswordComponent, ForgotSuccessComponent, PlannerPendingEmailComponent, InvitesOnboardingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SocialLoginModule,
    FormsModule, ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    CountryCodeInputModule,
    RouterModule
  ],
  entryComponents: [LoginComponent, PlannerSignupComponent, VendorSignupComponent, VerificationPendingComponent, SelectUserTypeComponent,
    ForgotPasswordComponent, ForgotSuccessComponent, PlannerPendingEmailComponent, InvitesOnboardingComponent],
  providers: [
    LoginSignupService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  exports: [
    FormLoginComponent
  ]
})
export class LoginSignupModule { }
