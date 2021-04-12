import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MessageApiService } from '../service/message-api.service';
import { IMessageListObject } from '@models/IMessageListObject';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Constants } from '@app/config/constant';
import { trackByObjectId, CheckRoles } from '@app/core/utils/common.util';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';
import { CommonService } from '@app/core/services/common/common.service';
import { take } from 'rxjs/internal/operators/take';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss'],
})
export class MessageWindowComponent implements OnInit, OnDestroy {
  options;
  @ViewChild('detail', { static: true }) detail: ElementRef<HTMLElement>;
  @ViewChild(MessageInputComponent, {static: true}) messageInput: MessageInputComponent;
  @Output() messageEvent = new EventEmitter<boolean>();
  messageDetails;
  pageData: { totalPages: number, page: number };
  readonly destroyed$ = new Subject();
  message;
  isVendor;
  role;
  s3BaseUrl = environment.s3BaseUrl;
  trackByFn = trackByObjectId;
  chatTypes = Constants.MESSAGE_TYPE;
  isInitialScrolled = false;
  isAdmin: boolean;
  userRoles = Constants.Role;
  quoteStatusText = Constants.PLANNER_QUOTE_HEADING;
  orderStatusText = Constants.QUOTE_STATUS_DISPLAY;
  constructor(
    private readonly messageApiService: MessageApiService, private readonly checkRole: CheckRoles,
    private readonly sessionService: SessionManagerService, private readonly commonService: CommonService) { }

  ngOnInit() {
    this.isAdmin = this.checkRole.isAdmin();
    this.options = { root: this.detail.nativeElement };
    this.role = this.sessionService.getRole();
    this.isVendor = this.sessionService.getRole() === Constants.Role.VENDOR;
    this.messageApiService.getActiveChat()
      .pipe(takeUntil(this.destroyed$), filter(res => !!res), map(res => res as IMessageListObject))
      .subscribe(res => {
        this.message = res;
        this.getMessageDetails(true);
      });
  }

  scrolled() {
    if (this.isInitialScrolled && this.pageData && this.pageData.totalPages > this.pageData.page) {
      this.getMessageDetails(false, { page: this.pageData.page + 1 });
    } else {
      this.isInitialScrolled = true;
    }
  }

  getMessageDetails(newChat, options = {}) {
    this.messageApiService.getMessageById(this.message._id, options, this.isAdmin)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        if (res.data) {
          this.messageDetails = newChat ? res.data.docs :
            [...this.messageDetails.concat(...res.data.docs)];
          this.pageData = { totalPages: res.data.totalPages, page: res.data.page };
        }
        this.updateChatList(newChat);
        const objDiv = document.getElementById('msg-detail') as HTMLElement;
        return newChat ?
          setTimeout(() => objDiv.scrollTop = objDiv.scrollHeight)
          : objDiv.scrollTo(0, objDiv.scrollHeight / Constants.FRACTION_TO_ROLL_BACK);
      });
  }

  updateChatList(newChat) {
    if (newChat && this.messageDetails[0].message && this.messageDetails[0].createdAt) {
      this.messageApiService.setRecentMessage({
        message: this.messageDetails[0].message,
        createdAt: this.messageDetails[0].createdAt, thread: this.messageDetails[0].thread,
        image: this.messageDetails[0].image || null,
        type: this.messageDetails[0].type
      });
    }
  }

  onBack() {
    this.messageEvent.emit(false);
  }

  downloadFile(url) {
    window.location.href = url;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
