import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEventRoutingModule } from './add-event-routing.module';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AddEditEventService } from '../services/add-edit-event/add-edit-event.service';
import { VariableInfoFormModule } from '@app/shared/variable-info-form/variable-info-form.module';
import { SharedStatesModule } from '@app/shared/shared-states/shared-states.module';
import { DpDatePickerModule } from 'ng2-date-picker';
import { CountryCodeInputModule } from '@app/shared/country-code-input/country-code-input.module';





@NgModule({
  declarations: [AddEditEventComponent],
  imports: [
    CommonModule,
    AddEventRoutingModule,
    NgSelectModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    VariableInfoFormModule,
    SharedStatesModule,
    DpDatePickerModule,
    CountryCodeInputModule
  ], providers: [AddEditEventService]
})
export class AddEventModule { }
