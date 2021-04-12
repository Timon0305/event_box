import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDatePipe } from './event-date.pipe';



@NgModule({
  declarations: [EventDatePipe],
  imports: [
    CommonModule
  ], exports: [EventDatePipe]
})
export class EventDatePipeModule { }
