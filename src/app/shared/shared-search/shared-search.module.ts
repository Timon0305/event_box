import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSearchComponent } from './shared-search/shared-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SharedSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [SharedSearchComponent]
})
export class SharedSearchModule { }
