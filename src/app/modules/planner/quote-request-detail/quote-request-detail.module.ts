import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRequestDetailRoutingModule } from './quote-request-detail-routing.module';
import { QuoteRequestDetailComponent } from './quote-request-detail/quote-request-detail.component';
import { ViewVariableInfoModule } from '@app/shared/view-variable-info/view-variable-info.module';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { SharedCancelRejectPopupModule } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { ViewQuoteRequestModule } from '@app/shared/view-quote-request/view-quote-request.module';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { ViewNotesModule } from '../quote-request-folder/view-notes/view-notes.module';
import { ReverseArrayPipeModule } from '@app/shared/reverse-array-pipe/reverse-array-pipe.module';
import { TimezoneDateFormatModule } from '@app/shared/pipes/timezone-date-format/timezone-date-format.module';


@NgModule({
  declarations: [QuoteRequestDetailComponent],
  imports: [
    CommonModule,
    QuoteRequestDetailRoutingModule,
    ViewVariableInfoModule,
    SharedPhonePipeModule,
    BreadcrumbsModule,
    SharedCancelRejectPopupModule,
    NoImageDirectiveModule,
    NgbModule,
    ViewQuoteRequestModule,
    SharedConfirmationPopupModule,
    ViewNotesModule,
    ReverseArrayPipeModule,
    TimezoneDateFormatModule
  ]
})
export class QuoteRequestDetailModule { }
