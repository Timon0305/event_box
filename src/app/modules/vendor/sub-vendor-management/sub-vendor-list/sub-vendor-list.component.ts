import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Components
import { InviteSubVendorComponent } from '../invite-sub-vendor/invite-sub-vendor.component';
import { SubVendorManagementService } from '../services/sub-vendor-management.service';
import { IPaginatedData } from '@app/models/IApiResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LoaderService } from '@app/core/services/loader.service';
import { SubVendorStatusComponent } from '../sub-vendor-status/sub-vendor-status.component';
import * as moment from 'moment';
import { Constants } from '@app/config/constant';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
@Component({
  selector: 'app-sub-vendor-list',
  templateUrl: './sub-vendor-list.component.html',
  styleUrls: ['./sub-vendor-list.component.scss'],
  providers: [SubVendorManagementService]
})
export class SubVendorListComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject();
  data: IPaginatedData;
  page; keyword: string;
  searchField: FormControl = new FormControl();
  myId = '';
  constructor(
    private readonly modalService: NgbModal,
    private readonly subVendorManagementService: SubVendorManagementService,
    private readonly route: ActivatedRoute, private readonly router: Router,
    private readonly loaderService: LoaderService,
    private readonly sessionManager: SessionManagerService
  ) { }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.page = params.page;
      this.keyword = params.keyword || '';
      this.getSubVendorList(this.page, this.keyword);
    });

    this.getSubVendorList(this.page);

    this.searchField.valueChanges.pipe(
      debounceTime(Constants.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe(keyword => {
        this.page = 1;
        this.router.navigateByUrl(`/vendor/sub-vendor-management?page=${this.page}&keyword=${keyword}`);
      });
    this.myId = this.sessionManager.getUserId();
  }

  inviteSubVendor() {
    this.modalService.open(InviteSubVendorComponent, { centered: true });
  }

  changeVendorStatus(vendor) {
    const modalRef = this.modalService.open(SubVendorStatusComponent, { centered: true });
    modalRef.componentInstance.vendor = vendor;
  }

  getSubVendorList(page, keyword?: string) {
    this.loaderService.start();
    this.subVendorManagementService.getSubVendorList(page, keyword).subscribe(res => {
      this.data = res;
      this.loaderService.stop();
    },
      () => {
        this.loaderService.stop();
      }
    );
  }

  pageChange(page) {
    this.router.navigateByUrl(`/vendor/sub-vendor-management?page=${page}${this.keyword ? '&keyword=' + this.keyword : ''}`);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  formatDate(date) {
    return moment(date).format(Constants.DATE_FORMAT);
  }

}
