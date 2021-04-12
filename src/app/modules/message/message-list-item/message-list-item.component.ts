import { Component, OnInit, Input, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { environment } from '@environments/environment';
import { MessageApiService } from '../service/message-api.service';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Constants } from '@app/config/constant';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { IMessageListObject, IRecentMessageData } from '@app/models/IMessageListObject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CheckRoles } from '@app/core/utils/common.util';
import { DOCUMENT } from '@angular/common';
import { CommonService } from '@app/core/services/common/common.service';

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.scss']
})
export class MessageListItemComponent implements OnInit, OnDestroy {
  @Input() message;
  @Input() index;
  s3BaseUrl = environment.s3BaseUrl;
  activeChatId;
  isVendor;
  readonly destroyed$ = new Subject();
  messageType = Constants.MESSAGE_TYPE;
  isAdmin: boolean;
  scrollToDown = true;
  @Output() updateListPosition = new EventEmitter();
  constructor(
    private readonly commonService: CommonService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly checkRole: CheckRoles,
    private readonly messageApiService: MessageApiService,
    private readonly sessionService: SessionManagerService) { }
  ngOnInit() {
    this.isAdmin = this.checkRole.isAdmin();
    if (this.index === 0) {
      this.messageApiService.setActiveChatId(this.message);
      this.message.unreadCount = 0;
    }
    this.messageApiService.getActiveChat()
      .pipe(takeUntil(this.destroyed$), filter(res => !!res), map(res => res as IMessageListObject))
      .subscribe((res) => {
        this.activeChatId = res._id;
      });
    this.isVendor = this.sessionService.getRole() === Constants.Role.VENDOR;
    this.subscribeRecentMessage();
  }

  subscribeRecentMessage() {
    this.messageApiService.getRecentMessage()
      .pipe(takeUntil(this.destroyed$), filter(res => !!res), map(res => res as IRecentMessageData))
      .subscribe(res => {
        if (this.message._id === res.thread) {
          this.message.recentMessage.message = res.message;
          this.message.recentMessage.createdAt = res.createdAt;
          this.message.recentMessage.type = res.type;
          this.message.recentMessage.image = res.image;
          this.updateListPosition.emit(this.message._id);
        }
      });
  }

  openChat() {
    if (this.scrollToDown && this.commonService.getResponsive(Constants.RESPONSIVE_WINDOW_MIN_WIDTH.INNERWIDTH)) {
      // For mobile and small screens, only when first time click on message list item
      this.scrollToDown = false;
      const objDiv = this.document.getElementById('msg-detail') as HTMLElement;
      setTimeout(() => objDiv.scrollTop = objDiv.scrollHeight);
    }
    if (this.message._id !== this.activeChatId) {
      this.messageApiService.setActiveChatId(this.message);
      this.message.unreadCount = 0;
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
