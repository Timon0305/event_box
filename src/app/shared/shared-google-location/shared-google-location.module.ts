import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedGoogleLocationComponent } from './shared-google-location/shared-google-location.component';



@NgModule({
  declarations: [SharedGoogleLocationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SharedGoogleLocationComponent]
})
export class SharedGoogleLocationModule { }
