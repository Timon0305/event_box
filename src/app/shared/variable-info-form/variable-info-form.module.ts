import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariableInfoFormComponent } from './variable-info-form/variable-info-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DpDatePickerModule} from 'ng2-date-picker';



@NgModule({
  declarations: [VariableInfoFormComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    DpDatePickerModule,
  ], exports: [VariableInfoFormComponent]
})
export class VariableInfoFormModule { }
