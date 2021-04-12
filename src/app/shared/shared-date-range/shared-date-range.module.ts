import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDateRangeComponent } from './shared-date-range/shared-date-range.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SharedDateRangeComponent],
  imports: [
    CommonModule,
    DpDatePickerModule,
    FormsModule, ReactiveFormsModule
  ], exports: [SharedDateRangeComponent]
})
export class SharedDateRangeModule { }
