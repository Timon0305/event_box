import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSignupModule } from '@modules/login-signup/login-signup.module';

import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  declarations: [
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AdminLoginRoutingModule,
    LoginSignupModule
  ]
})
export class AdminLoginModule { }
