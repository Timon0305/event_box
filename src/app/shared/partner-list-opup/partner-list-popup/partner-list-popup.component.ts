import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { PartnerListService } from '@app/modules/admin/partner-list/partner-list.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/internal/operators/map';
import { FormControl } from '@angular/forms';
import { trackByObjectId } from '@app/core/utils/common.util';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Constants } from '@app/config/constant';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Params } from '@angular/router';

@Component({
  selector: 'app-partner-list-popup',
  templateUrl: './partner-list-popup.component.html',
  styleUrls: ['./partner-list-popup.component.scss']
})
export class PartnerListPopupComponent implements OnInit, OnDestroy {
  @Input() usersIdToAssociate = [];
  @Input() associatedPartnerId;
  @Input() role;
  options;
  searchField: FormControl = new FormControl('');
  partnerIdToAssociate: FormControl = new FormControl('');
  constructor(
    private readonly partnerService: PartnerListService, public readonly activeModal: NgbActiveModal) { }
  partnerList$;
  partnerListData = [];
  page;
  totalPages;
  loader = false;
  trackByFn = trackByObjectId;
  destroyed$ = new Subject();
  @ViewChild('messageListConatiner', { static: true }) listContainer: ElementRef<HTMLElement>;

  ngOnInit() {
    this.partnerIdToAssociate.setValue(this.associatedPartnerId);
    this.options = { root: this.listContainer.nativeElement };
    setTimeout(() => this.getPartnersList({}));
    this.searchField.valueChanges.pipe(
      debounceTime(Constants.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    )
      .subscribe(keyword => {
        const params = keyword ? { filter: keyword, page: 1 } : { page: 1 };
        this.getPartnersList(params, true);
      });
  }

  getPartnersList(params: Params, fromSearch = false) {
    this.partnerList$ = this.partnerListApi(params, fromSearch);
  }

  partnerListApi(params, fromSearch) {
    this.loader = true;
    const queryParams = this.associatedPartnerId ? { ...params, associatedWith: this.associatedPartnerId } : { ...params };
    return this.partnerService.getPartnerListForPopup(queryParams)
      .pipe(map(res => {
        this.loader = false;
        if (fromSearch) {
          this.partnerListData = res.docs;
        } else {
          this.partnerListData = this.partnerListData.concat(res.docs);
        }
        this.page = res.page;
        this.totalPages = res.totalPages;
      }));
  }

  scrolled() {
    if (this.page && this.page < this.totalPages) {
      this.getPartnersList({ page: Number(this.page) + 1 });
    }
  }

  selectPartner(partnerId) {
    this.partnerIdToAssociate.setValue(partnerId);
  }

  changeAssociation() {
    this.partnerService.changeAssociation({
      associatedIds: this.usersIdToAssociate,
      associateTo: this.partnerIdToAssociate.value,
      role: this.role
    }).pipe(takeUntil(this.destroyed$)).subscribe(() => this.activeModal.close(true));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
