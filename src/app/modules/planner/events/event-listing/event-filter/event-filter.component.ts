import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Constants } from '@app/config/constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss']
})
export class EventFilterComponent implements OnInit {
  sortByData = Constants.EVENT_SORTBY_FIELDS;
  @Output() changedSorting = new EventEmitter();
  @Input() isPlanner;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    if (this.route.snapshot.queryParams.type === Constants.EVENT_TYPE.pastEvent) {
      this.sortByData = Constants.PAST_EVENT_SORTBY_FIELDS;
    }
  }
  sortFilterChange(filter) {
    this.changedSorting.emit({ ...filter });
  }
}
