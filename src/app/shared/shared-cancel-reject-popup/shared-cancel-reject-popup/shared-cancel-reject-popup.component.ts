import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-shared-cancel-reject-popup',
  templateUrl: './shared-cancel-reject-popup.component.html',
  providers: [HelperService]
})

export class SharedCancelRejectPopupComponent implements OnInit {
  reasonForm: FormGroup;
  @Input() showCunterOfferReq = true;
  @Input() quoteDetail;
  constantNumber = Constants.NUMBER;
  constructor(
    private readonly helperService: HelperService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.reasonForm = this.helperService.createReasonForm();
  }
}
