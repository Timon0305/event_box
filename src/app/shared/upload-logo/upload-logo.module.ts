import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadLogoComponent } from './upload-logo/upload-logo.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';



@NgModule({
  declarations: [UploadLogoComponent],
  imports: [
    CommonModule,
    NgxUiLoaderModule
  ], exports: [UploadLogoComponent]
})
export class UploadLogoModule { }
