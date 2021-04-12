import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeInputDirective } from './capitalize-input.directive';



@NgModule({
  declarations: [CapitalizeInputDirective],
  imports: [
    CommonModule
  ], exports: [CapitalizeInputDirective]
})
export class CapitalizeInputModule { }
