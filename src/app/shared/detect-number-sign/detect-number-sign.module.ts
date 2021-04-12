import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectNumberSignPipe } from './detect-number-sign.pipe';



@NgModule({
  declarations: [DetectNumberSignPipe],
  imports: [
    CommonModule
  ], exports: [DetectNumberSignPipe]
})
export class DetectNumberSignModule { }
