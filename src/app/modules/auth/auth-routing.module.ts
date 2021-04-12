import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '@app/modules/auth/register/register.component';
import { VerifyEmailComponent } from '@app/modules/auth/verify-email/verify-email.component';
import { ResetPasswordComponent } from '@app/modules/auth/reset-password/reset-password.component';
import { VerificationComponent } from '@app/modules/auth/verification/verification.component';
import { ResetSuccessComponent } from './reset-success/reset-success.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  { path: 'reset/password/success', component: ResetSuccessComponent },
  { path: 'verification/:error_type', component: VerificationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
