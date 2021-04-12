import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PartnerListPopupComponent } from '@app/shared/partner-list-opup/partner-list-popup/partner-list-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trackByObjectId, toggleCheck } from '@app/core/utils/common.util';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '@app/config/constant';
import { PartnerListService } from '@app/modules/admin/partner-list/partner-list.service';

@Component({
  selector: 'app-partner-vendor-table',
  templateUrl: './partner-vendor-table.component.html',
  styleUrls: ['./partner-vendor-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerVendorTableComponent implements OnInit {
  @Input() vendorList;
  @Input() loader;
  @Output() pageChangeEvent = new EventEmitter();
  checkList: Array<string> = [];
  trackByFn = trackByObjectId;
  s3BaseUrl = environment.s3BaseUrl;
  @Output() checkListLen = new EventEmitter();
  @Output() fetchList = new EventEmitter();
  @Output() unlinkVendors = new EventEmitter();
  isAdmin;
  constructor(
    private readonly partnerService: PartnerListService,
    private readonly route: ActivatedRoute,
    private readonly modalService: NgbModal) { }

  ngOnInit() {
    this.isAdmin = this.partnerService.isAdmin();
  }

  pageChange(page) {
    this.pageChangeEvent.emit(page);
  }

  unlink() {
    this.unlinkVendors.emit({
      associatedIds: this.checkList,
      associateTo: 'null',
      role: Constants.Role.VENDOR
    });
  }
  initiateAssociationChange() {
    const modalRef = this.modalService.open(PartnerListPopupComponent, { size: 'sm', windowClass: 'partner-list-modal' });
    modalRef.componentInstance.usersIdToAssociate = this.checkList;
    modalRef.componentInstance.role = Constants.Role.VENDOR;
    modalRef.componentInstance.associatedPartnerId = this.route.snapshot.params.partnerId;
    modalRef.result.then(res => {
      if (res) {
        this.checkList = [];
        this.fetchList.emit({ page: 1 });
      }
    }).catch(err => err);
  }

  toggleCheck(event, id) {
    this.checkList = toggleCheck({ event, id, checkList: this.checkList });
    this.checkListLen.emit(this.checkList.length);
  }
}
