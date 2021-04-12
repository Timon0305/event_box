import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedProductSearchComponent } from './shared-product-search/shared-product-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SharedProductSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SharedProductSearchComponent]
})
export class SharedProductSearchModule { }
