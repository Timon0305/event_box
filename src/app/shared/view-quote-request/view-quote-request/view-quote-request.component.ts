import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-view-quote-request',
  templateUrl: './view-quote-request.component.html',
  styleUrls: ['./view-quote-request.component.scss']
})
export class ViewQuoteRequestComponent implements OnInit {
  @Input() quote;
  quoteViewStatus = Constants.QUOTE_STATUS_DISPLAY;
  timezoneMap = Constants.TIME_ZONE_DISPLAY_MAP;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  print(link) {
    window.location.href = link;
  }

}
