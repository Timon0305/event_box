import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { isSmallScreen } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  @Input() metaData;
  @Output() pageChange = new EventEmitter();
  paginationMaxSize;
  constructor() {

  }
  ngOnInit() {
    this.paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
    if (isSmallScreen()) {
      this.paginationMaxSize = Constants.SMALL_SCREEN_PAGINATION_MAX_SIZE;
    }
  }

  onPageChange(page) {
    this.pageChange.emit(page);
  }

}
