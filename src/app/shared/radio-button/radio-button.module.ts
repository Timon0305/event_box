import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RadioButtonComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [RadioButtonComponent]
})
export class RadioButtonModule { }
