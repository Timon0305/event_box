import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerProfileCompleteComponent } from './planner-profile-complete/planner-profile-complete.component';
import { ProfileServiceService } from './planner-profile-complete/services/profile-service.service';
import { UploadLogoModule } from '@app/shared/upload-logo/upload-logo.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PlannerProfileRoutingModule } from './planner-profile.routing';
import { CountryCodeInputModule } from '@app/shared/country-code-input/country-code-input.module';


@NgModule({
  declarations: [PlannerProfileCompleteComponent],
  imports: [
    CommonModule,
    UploadLogoModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule,
    PlannerProfileRoutingModule,
    CountryCodeInputModule
  ], providers: [ProfileServiceService]
})
export class PlannerProfileCompleteModule { }
