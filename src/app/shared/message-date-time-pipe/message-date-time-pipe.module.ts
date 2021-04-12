import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDateTimePipe } from './message-date-time.pipe';



@NgModule({
  declarations: [MessageDateTimePipe],
  imports: [
    CommonModule
  ],
  exports: [MessageDateTimePipe]
})
export class MessageDateTimePipeModule { }
