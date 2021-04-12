import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorProfileFormComponent } from './vendor-profile-form/vendor-profile-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadLogoModule } from '../upload-logo/upload-logo.module';
import { CountryCodeInputModule } from '@app/shared/country-code-input/country-code-input.module';

@NgModule({
  declarations: [VendorProfileFormComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    UploadLogoModule,
    CountryCodeInputModule
  ], exports: [VendorProfileFormComponent]
})
export class VendorProfileFormModule { }
