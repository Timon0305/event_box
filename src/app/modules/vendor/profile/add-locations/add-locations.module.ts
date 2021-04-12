import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLocationComponent } from './add-location/add-location.component';
import { CompleteProfileModule } from '@app/modules/complete-profile/complete-profile.module';



@NgModule({
  declarations: [AddLocationComponent],
  imports: [
    CommonModule,
    CompleteProfileModule
  ],
  entryComponents: [AddLocationComponent],
  exports: [AddLocationComponent]
})
export class AddLocationsModule { }
