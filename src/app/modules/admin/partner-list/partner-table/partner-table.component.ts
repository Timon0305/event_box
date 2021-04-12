import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trackByObjectId, changeQueryParams } from '@app/core/utils/common.util';
import { SharedConfirmationPopupService } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-partner-table',
  templateUrl: './partner-table.component.html',
  styleUrls: ['./partner-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerTableComponent implements OnInit {
  @Input() partnerListData;
  @Output() deletePartnerEvent = new EventEmitter();
  trackByFn = trackByObjectId;
  constructor(
    private readonly popupService: SharedConfirmationPopupService,
    private readonly router: Router, readonly route: ActivatedRoute) { }

  ngOnInit() {
  }

  navigateToDashboard(partnerId) {
    this.router.navigate(['admin/partner-management/view', partnerId]);
  }

  pageChange(page) {
    changeQueryParams({ page }, this.route, this.router);
  }

  deletePartner(partnerId, currentPage) {
    const modalRef = this.popupService.showPopup(Constants.DELETE_PARTNER);
    modalRef.result.then(res => {
      if (!res) {
        this.deletePartnerEvent.emit({partnerId, currentPage});
      }
    }).catch(err => err);
  }

}
