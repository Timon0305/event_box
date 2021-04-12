import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginSignupModule } from '@modules/login-signup/login-signup.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerificationComponent } from './verification/verification.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetSuccessComponent } from './reset-success/reset-success.component';

@NgModule({
  declarations: [RegisterComponent, ResetPasswordComponent,
     VerificationComponent, VerifyEmailComponent, ResetSuccessComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginSignupModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AuthModule { }
