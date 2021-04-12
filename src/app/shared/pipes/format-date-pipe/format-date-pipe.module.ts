import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDate } from './format-date.pipe';



@NgModule({
  declarations: [FormatDate],
  imports: [
    CommonModule
  ], exports: [FormatDate]
})
export class FormatDatePipeModule { }
