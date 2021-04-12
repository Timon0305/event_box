import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { trackByObjectId } from '@app/core/utils/common.util';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Constants } from '@app/config/constant';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  trackByFn = trackByObjectId;
  options;
  @Input() loading = false;
  @Output() messageEvent = new EventEmitter<boolean>();
  searchField: FormControl = new FormControl('');
  message = false;
  @Input() fromSearch;
  @ViewChild('messageListConatiner', { static: true }) listContainer: ElementRef<HTMLElement>;

  @Input() set setMessageListData(value) {
    if (value) {
      this.pageData = { totalPages: value.totalPages, page: value.page };
      if (this.fromSearch) {
        this.messageList = value.docs;
      } else {
        this.messageList = this.messageList.concat(value.docs);
      }
      this.options = { root: this.listContainer.nativeElement };
      setTimeout(() => {
        this.isListEmpty.emit(this.messageList.length === 0 && !this.searchField.value);
      });
    }
  }
  messageList = [];
  pageData: { totalPages: number, page: number };
  @Output() fetchData = new EventEmitter();
  @Output() isListEmpty = new EventEmitter();
  readonly destroyed$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.searchField.valueChanges.pipe(
      debounceTime(Constants.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    )
      .subscribe(keyword => {
        const params = keyword ? { filter: keyword, page: 1 } : { page: 1 };
        this.fetchData.emit({ ...params, fromSearch: true });
      });
  }

  scrolled() {
    if (this.pageData && this.pageData.page && this.pageData.totalPages > this.pageData.page) {
      this.fetchData.emit({ page: this.pageData.page + 1 });
    }
  }

  onMessage() {
    this.messageEvent.emit(true);
  }

  updateListPosition(messageThreadId) {
    const messageIndex = this.getIndex(messageThreadId);
    // bring recent message to up.
    if (messageIndex > 0) {
      this.messageList =
        this.messageList
          .sort((a: { recentMessage: { createdAt: string } }, b: { recentMessage: { createdAt: string } }) =>
            new Date(b.recentMessage.createdAt).getTime() - new Date(a.recentMessage.createdAt).getTime());
      // if message item position get shifted from prev, scroll to top
      if (this.getIndex(messageThreadId) !== messageIndex) {
        this.listContainer.nativeElement.scroll(0, 0);
      }
    }
  }

  getIndex(messageThreadId) {
    return this.messageList.findIndex((msg: { _id: string }) => msg._id === messageThreadId);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
