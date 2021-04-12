import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDateFilterComponent } from './shared-date-filter/shared-date-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SharedDateFilterComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule
  ], exports: [SharedDateFilterComponent]
})
export class SharedDateFilterModule { }
