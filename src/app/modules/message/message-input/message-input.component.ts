import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { MessageApiService } from '../service/message-api.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { fileUpload } from '@app/core/utils/common.util';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit, OnDestroy {
  chatText: FormControl = new FormControl('');
  @Input() message;
  @Output() getMessageDetails = new EventEmitter();
  @Input() isVendor;
  loader = false;
  readonly destroyed$ = new Subject();

  constructor(
    private readonly messageApiService: MessageApiService,
    private readonly alertService: AlertService) { }

  ngOnInit() {
  }

  sendMessage() {
    if (this.chatText.value) {
      const payload: {
        type: string;
        message: string;
        thread: string;
        planner?: string
      } = {
        type: Constants.MESSAGE_TYPE.TEXT,
        message: this.chatText.value,
        thread: this.message._id
      };
      if (this.isVendor) {
        payload.planner = this.message.planner;
      }
      this.sendMessageApi(payload);
    }
  }

  async  uploadMedia(source) {
    try {
      if (await
        fileUpload(source, Constants.PRODUCT_FORM.productImageSize, Constants.MESSAGE_MEDIA_ALLOWED)) {
        this.loader = true;
        this.messageApiService.sendMediaMessage({ file: source.files[0], thread: this.message._id })
          .pipe(takeUntil(this.destroyed$))
          .subscribe(res => {
            source.value = null;
            this.updateMessageList(res);
            this.loader = false;
          }, err => {
            this.loader = false;
          });
      }
    } catch (error) {
      this.alertService.showError(error);
    }
  }

  sendMessageApi(payload) {
    this.messageApiService.sendMessage(payload)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.chatText.setValue('');
        this.updateMessageList(res);
      });
  }

  updateMessageList(res) {
    this.getMessageDetails.emit(true);
    if (res.data.message && res.data.createdAt) {
      this.messageApiService.setRecentMessage({
        message: res.data.message,
        createdAt: res.data.createdAt, thread: res.data.thread,
        image: res.data.image || null,
        type: res.data.type
      });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
