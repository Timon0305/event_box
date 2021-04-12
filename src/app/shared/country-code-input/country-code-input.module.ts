import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryCodeInputComponent } from './country-code-input/country-code-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

@NgModule({
  declarations: [CountryCodeInputComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptionHighlightModule
  ],
  exports: [CountryCodeInputComponent]
})
export class CountryCodeInputModule { }
