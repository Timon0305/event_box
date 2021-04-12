import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSelectComponent } from './shared-select/shared-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SharedSelectComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule
  ], exports: [SharedSelectComponent]
})
export class SharedSelectModule { }
