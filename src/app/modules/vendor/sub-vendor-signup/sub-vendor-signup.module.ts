import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SubVendorSignupRoutingModule } from './sub-vendor-signup-routing.module';
import { SubVendorSignupComponent } from './sub-vendor-signup/sub-vendor-signup.component';


@NgModule({
  declarations: [SubVendorSignupComponent],
  imports: [
    CommonModule,
    SubVendorSignupRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class SubVendorSignupModule { }
