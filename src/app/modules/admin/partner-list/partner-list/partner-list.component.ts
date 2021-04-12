import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PartnerListService } from '../partner-list.service';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerListComponent implements OnInit, OnDestroy {
  partnerListData;
  destroyed$ = new Subject();
  partnerListSort = Constants.PARTNER_LIST_SORT;
  loader = false;
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    readonly route: ActivatedRoute,
    private readonly partnerListService: PartnerListService) { }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.getPartnersList(params);
    });
  }

  search(keyword) {
    this.changeQueryParams({ filter: keyword || null });
  }

  getPartnersList(params) {
    this.loader = true;
    this.partnerListService.getPartnersList(params)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.partnerListData = { ...res };
        this.loader = false;
        this.cdr.detectChanges();
      });
  }

  sortFilterChange(sort) {
    this.changeQueryParams(sort);
  }

  changeQueryParams(params) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  deletePartner({ partnerId, currentPage }) {
    this.partnerListService.adminDeletePartner(partnerId)
      .pipe(takeUntil(this.destroyed$)).subscribe(() => {
        if (currentPage > 1) {
          changeQueryParams({ page: 1 }, this.route, this.router);
        } else {
          this.getPartnersList({...this.route.snapshot.queryParams});
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
