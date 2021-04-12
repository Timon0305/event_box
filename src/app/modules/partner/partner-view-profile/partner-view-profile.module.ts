import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerViewProfileComponent } from './partner-view-profile/partner-view-profile.component';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { RouterModule } from '@angular/router';
import { FormatDatePipeModule } from '@app/shared/pipes/format-date-pipe/format-date-pipe.module';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';


@NgModule({
  declarations: [PartnerViewProfileComponent],
  imports: [
    CommonModule,
    SharedPhonePipeModule,
    RouterModule,
    FormatDatePipeModule,
    SharedConfirmationPopupModule
  ], exports: [PartnerViewProfileComponent]
})
export class PartnerViewProfileModule { }
