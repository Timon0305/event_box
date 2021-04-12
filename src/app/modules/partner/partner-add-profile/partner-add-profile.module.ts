import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerAddProfileRoutingModule } from './partner-add-profile-routing.module';
import { AddPartnerProfileComponent } from './add-partner-profile/add-partner-profile.component';
import { AddPartnerBankDetailsComponent } from './add-partner-bank-details/add-partner-bank-details.component';
import { AddBasicDetailsComponent } from './add-basic-details/add-basic-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AddCommissionDetailsComponent } from './add-commission-details/add-commission-details.component';
import { SharedBankDetailModule } from '@app/shared/shared-bank-detail/shared-bank-detail.module';
import { SharedStatesModule } from '@app/shared/shared-states/shared-states.module';
import { NgxMaskModule } from 'ngx-mask';
import { NumberInputModule } from '@app/shared/directives/number-input/number-input.module';
import { CountryCodeInputModule } from '@app/shared/country-code-input/country-code-input.module';



@NgModule({
  declarations: [AddPartnerProfileComponent,
    AddPartnerBankDetailsComponent, AddBasicDetailsComponent, AddCommissionDetailsComponent],
  imports: [
    CommonModule,
    PartnerAddProfileRoutingModule,
    FormsModule, ReactiveFormsModule,
    DpDatePickerModule,
    SharedBankDetailModule,
    SharedStatesModule,
    NgxMaskModule,
    NumberInputModule,
    CountryCodeInputModule
  ]
})
export class PartnerAddProfileModule { }
