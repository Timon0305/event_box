import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrevenSpecialCharDirective } from './preven-special-char.directive';



@NgModule({
  declarations: [PrevenSpecialCharDirective],
  imports: [
    CommonModule
  ], exports: [PrevenSpecialCharDirective]
})
export class PreventSpecialCharModule { }
