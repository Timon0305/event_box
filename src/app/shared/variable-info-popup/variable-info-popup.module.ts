import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariableInfoPopupComponent } from './variable-info-popup/variable-info-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VariableInfoFormModule } from '../variable-info-form/variable-info-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NumberInputModule } from '@shared/directives/number-input/number-input.module';

@NgModule({
  declarations: [VariableInfoPopupComponent],
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule,
    NgbModule,
    VariableInfoFormModule,
    NgSelectModule,
    DpDatePickerModule,
    NumberInputModule
  ], entryComponents: [VariableInfoPopupComponent]
})
export class VariableInfoPopupModule { }
