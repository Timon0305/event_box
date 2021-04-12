import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedConfirmationPopupComponent } from './shared-confirmation-popup/shared-confirmation-popup.component';
import { SharedConfirmationPopupService } from './shared-confirmation-popup.service';




@NgModule({
  declarations: [SharedConfirmationPopupComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [SharedConfirmationPopupComponent],
  providers: [SharedConfirmationPopupService]
})
export class SharedConfirmationPopupModule { }
