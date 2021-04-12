import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReverseArrayPipe } from './reverse-array.pipe';



@NgModule({
  declarations: [ReverseArrayPipe],
  imports: [
    CommonModule
  ], exports: [ReverseArrayPipe]
})
export class ReverseArrayPipeModule { }
