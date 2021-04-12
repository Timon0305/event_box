import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteViewRoutingModule } from './quote-view-routing.module';
import { QuoteViewComponent } from './quote-view/quote-view.component';
import { SharedPhonePipeModule } from '@app/shared/shared-phone-pipe/shared-phone-pipe.module';
import { SharedPlannerNamePipeModule } from '@app/shared/shared-planner-name-pipe/shared-planner-name-pipe.module';
import { SharedCancelRejectPopupModule } from '@app/shared/shared-cancel-reject-popup/shared-cancel-reject-popup.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { RequestQuoteModule } from '@app/shared/request-quote/request-quote.module';
import { ViewQuoteRequestModule } from '@app/shared/view-quote-request/view-quote-request.module';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';
import { AdminViewQuoteModule } from '@app/modules/admin/vendor-management/admin-view-quote/admin-view-quote.module';
import { ViewNotesModule } from '@app/modules/planner/quote-request-folder/view-notes/view-notes.module';
import { ReverseArrayPipeModule } from '@app/shared/reverse-array-pipe/reverse-array-pipe.module';
import { TimezoneDateFormatModule } from '@app/shared/pipes/timezone-date-format/timezone-date-format.module';

@NgModule({
  declarations: [QuoteViewComponent],
  imports: [
    CommonModule,
    QuoteViewRoutingModule,
    SharedPhonePipeModule,
    SharedPlannerNamePipeModule,
    SharedCancelRejectPopupModule,
    NgbModule,
    BreadcrumbsModule,
    RequestQuoteModule,
    EventDatePipeModule,
    ViewQuoteRequestModule,
    AdminViewQuoteModule,
    ViewNotesModule,
    ReverseArrayPipeModule,
    TimezoneDateFormatModule
  ]
})
export class QuoteViewModule { }
