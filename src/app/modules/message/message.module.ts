import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageListItemComponent } from './message-list-item/message-list-item.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { InfiniteScrollModule } from '@app/shared/infinite-scroll/infinite-scroll.module';
import { MessageWindowComponent } from './message-window/message-window.component';
import { MessageDateTimePipeModule } from '@app/shared/message-date-time-pipe/message-date-time-pipe.module';
import { NoImageDirectiveModule } from '@app/shared/no-image-directive/no-image-directive.module';
import { MessageApiService } from './service/message-api.service';
import { SharedPlannerNamePipeModule } from '@app/shared/shared-planner-name-pipe/shared-planner-name-pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageInputComponent } from './message-input/message-input.component';
import { EventDatePipeModule } from '@app/shared/event-date-pipe/event-date-pipe.module';
import { ReverseArrayPipeModule } from '@app/shared/reverse-array-pipe/reverse-array-pipe.module';

@NgModule({
  declarations: [
    MessageComponent, MessageListComponent, MessageListItemComponent,
    MessageWindowComponent,
    MessageInputComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedSearchModule,
    InfiniteScrollModule,
    MessageDateTimePipeModule,
    NoImageDirectiveModule,
    SharedPlannerNamePipeModule,
    EventDatePipeModule,
    FormsModule, ReactiveFormsModule,
    ReverseArrayPipeModule,
  ],
  providers: [MessageApiService]
})
export class MessageModule { }
