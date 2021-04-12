import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAutoCompleteComponent } from './google-auto-complete/google-auto-complete.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [GoogleAutoCompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ], exports: [GoogleAutoCompleteComponent]
})
export class GoogleAutoCompleteModule { }
