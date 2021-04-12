import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedProfileViewComponent } from './shared-profile-view/shared-profile-view.component';
import { UploadLogoModule } from '../upload-logo/upload-logo.module';
import { NgxMaskModule } from 'ngx-mask';
import { SharedPhonePipeModule } from '../shared-phone-pipe/shared-phone-pipe.module';


@NgModule({
  declarations: [SharedProfileViewComponent],
  imports: [
    CommonModule,
    UploadLogoModule,
    NgxMaskModule.forRoot(),
    SharedPhonePipeModule
  ], exports: [SharedProfileViewComponent]
})
export class SharedProfileViewModule { }

