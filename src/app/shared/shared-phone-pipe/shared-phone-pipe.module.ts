import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPhone } from './format-phone.pipe';



@NgModule({
  declarations: [FormatPhone],
  imports: [
    CommonModule
  ], exports: [FormatPhone]
})
export class SharedPhonePipeModule { }
