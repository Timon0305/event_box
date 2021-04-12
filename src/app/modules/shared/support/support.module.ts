import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support/support.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportRoutingModule } from './support.routing';



@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    SupportComponent
  ]
})
export class SupportModule { }
