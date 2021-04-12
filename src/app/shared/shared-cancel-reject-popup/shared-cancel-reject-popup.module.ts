import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCancelRejectPopupComponent } from './shared-cancel-reject-popup/shared-cancel-reject-popup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SharedCancelRejectPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [SharedCancelRejectPopupComponent],
  exports: [SharedCancelRejectPopupComponent]
})
export class SharedCancelRejectPopupModule { }
