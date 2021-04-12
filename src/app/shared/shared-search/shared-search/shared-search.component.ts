import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-shared-search',
  templateUrl: './shared-search.component.html',
})
export class SharedSearchComponent implements OnInit {
  searchField: FormControl = new FormControl('');
  @Output() search = new EventEmitter<string>();
  constructor(readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.setSearchControlValue();
    this.searchField.valueChanges.pipe(
      debounceTime(Constants.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged()
    )
      .subscribe(keyword => {
        this.search.emit(keyword);
      });
  }

  setSearchControlValue() {
    this.searchField.setValue(this.route.snapshot.queryParams.filter || '');
  }

}
