import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventKeysDirective } from './prevent-key.directive';



@NgModule({
  declarations: [PreventKeysDirective],
  imports: [
    CommonModule
  ], exports: [PreventKeysDirective]
})
export class PreventKeyModule { }
