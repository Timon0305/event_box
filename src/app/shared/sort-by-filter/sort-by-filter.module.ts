
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortByFilterComponent } from './sort-by-filter/sort-by-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SortByFilterComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SortByFilterComponent]
})
export class SortByFilterModule { }
