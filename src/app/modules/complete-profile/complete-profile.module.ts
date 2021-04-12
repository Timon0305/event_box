import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { VendorBankDetailComponent } from './vendor-bank-detail/vendor-bank-detail.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { DetailTypeComponent } from './detail-type/detail-type.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileService } from './services/profile.service';
import { VendorProfileFooterModule } from '../vendor/vendor-profile-footer/vendor-profile-footer.module';
import { NgxMaskModule } from 'ngx-mask';
import { LocationFormComponent } from './location-form/location-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { UploadLogoModule } from '@app/shared/upload-logo/upload-logo.module';
import { SharedStatesModule } from '@app/shared/shared-states/shared-states.module';
import { GoogleAutoCompleteModule } from '../google-auto-complete/google-auto-complete.module';
import { VendorProfileFormModule } from '@app/shared/vendor-profile-form/vendor-profile-form.module';
import { SharedBankDetailModule } from '@shared/shared-bank-detail/shared-bank-detail.module';
@NgModule({
  declarations: [VendorBankDetailComponent, VendorDetailComponent,
    DetailTypeComponent, LocationFormComponent, ProfileFormComponent],
  imports: [
    CommonModule,
    CompleteProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    VendorProfileFooterModule,
    UploadLogoModule,
    SharedStatesModule,
    GoogleAutoCompleteModule,
    NgxMaskModule.forRoot(),
    VendorProfileFormModule,
    SharedBankDetailModule
  ],
  providers: [
    ProfileService
  ],
  exports: [VendorBankDetailComponent, ProfileFormComponent, LocationFormComponent]
})
export class CompleteProfileModule { }
