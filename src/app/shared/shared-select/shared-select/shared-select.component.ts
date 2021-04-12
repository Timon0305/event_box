import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { RequestService } from '@app/core/http/request-service';
import { Subject } from 'rxjs/internal/Subject';
import { IApiSuccess } from '@app/models/IApiResponse';

@Component({
  selector: 'app-shared-select',
  templateUrl: './shared-select.component.html',
})
export class SharedSelectComponent implements OnInit, OnDestroy {
  @Input() dataUrl;
  @Input() control;
  items;
  private readonly destroyed$ = new Subject();
  totalPages;
  currentPage  = 0;
  params;
  constructor(private readonly request: RequestService) { }

  ngOnInit() {
    this.fetchData();
    // Search on type, May be used later
    /*this.peopleInput$.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => {
        this.page = 1;
        if (term) {
          this.params = { ...this.params, page: 1, q: term };
        } else {
          this.params = { page: 1 };
        }
        return this.fetchMoreData(true);
      })
    ).subscribe();*/
  }

  onScrollToEnd() {
    if (this.currentPage < this.totalPages) {
      this.fetchData();
    }
  }

  fetchData(fromSearch = false) {
    this.request.get<IApiSuccess>(this.dataUrl, { page: this.currentPage + 1 }).pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.items = this.items ? [...this.items, ...res.data.docs] : res.data.docs;
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.page;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }



}
