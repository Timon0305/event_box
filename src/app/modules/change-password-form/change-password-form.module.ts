import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChangePasswordFormRoutingModule} from '@modules/change-password-form/change-password-form-routing.module';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { ChangePasswordService } from '@modules/change-password-form/services/change-password.service';

@NgModule({
  declarations: [ChangePasswordFormComponent],
  imports: [
    CommonModule,
    ChangePasswordFormRoutingModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [
    ChangePasswordService],
})

export class ChangePasswordFormModule { }
