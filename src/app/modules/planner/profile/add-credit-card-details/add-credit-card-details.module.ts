import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCreditCardDetailsRoutingModule } from './add-credit-card-details-routing.module';
import { AddCreditCardDetailsComponent } from './add-credit-card-details/add-credit-card-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddEditCardDetailsService } from './services/add-edit-card-details.service';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedStatesModule } from '@app/shared/shared-states/shared-states.module';
import { PreventKeyModule } from '@app/shared/directives/prevent-key/prevent-key.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';



@NgModule({
  declarations: [AddCreditCardDetailsComponent],
  imports: [
    CommonModule,
    AddCreditCardDetailsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    SharedStatesModule,
    PreventKeyModule,
    BreadcrumbsModule
  ],
  exports: [AddCreditCardDetailsComponent], providers: [ AddEditCardDetailsService ]
})
export class AddCreditCardDetailsModule { }
