import { Component, OnInit, Input } from '@angular/core';
import { Messages } from '@app/config/messages';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-view-quote',
  templateUrl: './admin-view-quote.component.html',
  styleUrls: ['./admin-view-quote.component.scss']
})
export class AdminViewQuoteComponent implements OnInit {
  @Input() order;
  quoteStatus = Messages.VENDOR_QUOTE_STATUS;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
