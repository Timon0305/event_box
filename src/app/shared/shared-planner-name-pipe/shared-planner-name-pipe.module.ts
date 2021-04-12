import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPlannerName } from './format-planner-name.pipe';



@NgModule({
  declarations: [FormatPlannerName],
  imports: [
    CommonModule
  ], exports: [FormatPlannerName]
})

export class SharedPlannerNamePipeModule { }
