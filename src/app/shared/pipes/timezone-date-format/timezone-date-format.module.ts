import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimezoneDateFormatPipe } from './timezone-date-format.pipe';



@NgModule({
  declarations: [TimezoneDateFormatPipe],
  imports: [
    CommonModule
  ], exports : [TimezoneDateFormatPipe]
})
export class TimezoneDateFormatModule { }
