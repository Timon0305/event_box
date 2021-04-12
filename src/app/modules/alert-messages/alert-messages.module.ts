import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster/toaster.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ToasterComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [ToasterComponent]
})
export class AlertMessagesModule { }
