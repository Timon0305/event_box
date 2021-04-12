import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCartTableComponent } from './shared-cart-table/shared-cart-table.component';
import { NoImageDirectiveModule } from '../no-image-directive/no-image-directive.module';
import { SharedConfirmationPopupModule } from '../shared-confirmation-popup/shared-confirmation-popup.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewQuoteRequestModule } from '../view-quote-request/view-quote-request.module';
import { TimezoneDateFormatModule } from '../pipes/timezone-date-format/timezone-date-format.module';



@NgModule({
  declarations: [SharedCartTableComponent],
  imports: [
    CommonModule,
    NoImageDirectiveModule,
    SharedConfirmationPopupModule,
    NgbModule,
    ViewQuoteRequestModule,
    TimezoneDateFormatModule
  ], exports: [SharedCartTableComponent]
})
export class SharedCartTableModule { }
