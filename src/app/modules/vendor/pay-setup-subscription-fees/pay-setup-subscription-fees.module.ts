import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaySetupSubscriptionFeesComponent } from './pay-setup-subscription-fees/pay-setup-subscription-fees.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PaySetupSubscriptionFeesComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [PaySetupSubscriptionFeesComponent],
  entryComponents: [PaySetupSubscriptionFeesComponent]
})
export class PaySetupSubscriptionFeesModule { }
