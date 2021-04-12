import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
})
export class ViewNoteComponent implements OnInit {
  @Input() form;
  onlyViewNotes;
  notes = '';
  quoteValidation = Constants.QUOTE_REQUEST_FORM;
  constructor(readonly activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  close() {
    this.activeModal.close();
  }

}
