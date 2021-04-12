import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerListPopupComponent } from '@app/shared/partner-list-opup/partner-list-popup/partner-list-popup.component';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { toggleCheck } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partner-planner-table',
  templateUrl: './partner-planner-table.component.html',
  styleUrls: ['./partner-planner-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerPlannerTableComponent implements OnInit {
  @Input() loader;
  @Input() plannerList;
  @Output() pageChangeEvent = new EventEmitter();
  @Output() checkListLen = new EventEmitter();
  @Output() fetchList = new EventEmitter();
  @Output() unlinkPlanner = new EventEmitter();
  @Input() isAdmin;
  roles = Constants.Role;

  checkList: Array<string> = [];
  constructor(private readonly modalService: NgbModal,
              public readonly sessionService: SessionManagerService,
              private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  pageChange(page) {
    this.pageChangeEvent.emit(page);
  }

  unlink() {
    this.unlinkPlanner.emit({
      associatedIds: this.checkList,
      associateTo: 'null',
      role: Constants.Role.PLANNER
    });
  }

  initiateAssociationChange() {
    const modalRef = this.modalService.open(PartnerListPopupComponent, { size: 'sm', windowClass: 'partner-list-modal' });
    modalRef.componentInstance.usersIdToAssociate = this.checkList;
    modalRef.componentInstance.role = Constants.Role.PLANNER;
    modalRef.componentInstance.associatedPartnerId = this.activatedRoute.snapshot.params.partnerId;
    modalRef.result.then(res => {
      if (res) {
        this.checkList = [];
        this.fetchList.emit({ page: 1 });
      }
    }).catch(res => res);
  }

  toggleCheck(event, id) {
    this.checkList = toggleCheck({ event, id, checkList: this.checkList });
    this.checkListLen.emit(this.checkList.length);
  }
}
