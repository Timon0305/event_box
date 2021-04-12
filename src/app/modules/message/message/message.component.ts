import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageApiService } from '../service/message-api.service';
import { map } from 'rxjs/internal/operators/map';
import { MessageListComponent } from '../message-list/message-list.component';
import { CheckRoles } from '@app/core/utils/common.util';
import { take } from 'rxjs/internal/operators/take';
import { CommonService } from '@app/core/services/common/common.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  messageList$;
  loading = false;
  isMessageListEmpty = false;
  messageSection = false;
  isAdmin: boolean;
  isCountCalled = false;
  fromSearch = false;
  @ViewChild(MessageListComponent, { static: true }) messageListComponent: MessageListComponent;

  constructor(
    private readonly messageApiService: MessageApiService,
    private readonly checkRoles: CheckRoles, private readonly commonService: CommonService) { }

  ngOnInit() {
    this.isAdmin = this.checkRoles.isAdmin();
    this.getMessageList();
  }

  onMessageEvent(event) {
    this.messageSection = event;
  }

  getMessageList(options: Params = {}) {
    this.loading = true;
    this.messageList$ = this.messageApiService.getMessageList(options, this.isAdmin).pipe(map(res => {
      this.loading = false;
      this.fromSearch = options.fromSearch;
      options = { ...options, fromSearch: null };
      if (!this.isCountCalled) {
        setTimeout(() => this.commonService.getHeaderCountApi().pipe(take(1)).subscribe(() => this.isCountCalled = true));
      }
      return res;
    }));
  }
  isListEmpty(isListEmpty) {
    this.isMessageListEmpty = isListEmpty;
  }

}
