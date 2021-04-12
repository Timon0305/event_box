import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LoginSignupModule } from '@modules/login-signup/login-signup.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    LoginSignupModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule { }
