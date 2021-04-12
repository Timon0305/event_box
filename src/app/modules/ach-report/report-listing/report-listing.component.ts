import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountReportComponent } from '../account-report/account-report.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AchReportService } from '../ach-report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { getYearList, trackByObjectId, changeQueryParams, getMonthList } from '@app/core/utils/common.util';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-report-listing',
  templateUrl: './report-listing.component.html',
  styleUrls: ['./report-listing.component.scss']
})
export class ReportListingComponent implements OnInit, OnDestroy {
  reportList$;
  reportList;
  destroyed$ = new Subject();
  yearsList: Array<number> = [];
  monthList: Array<string> = [];
  yearControl = new FormControl(Number(new Date().getFullYear()));
  monthControl = new FormControl(null);
  role;
  trackByFn = trackByObjectId;
  isInitialYearSet = false;
  dateReport$;
  constructor(
    private readonly activatedRoute: ActivatedRoute, private readonly router: Router,
    readonly modalService: NgbModal, private readonly achReportService: AchReportService,
    private readonly sessionService: SessionManagerService) { }

  ngOnInit() {
    this.role = this.sessionService.getRole();
    this.setControls(this.activatedRoute.snapshot.queryParams);
    this.yearsList = getYearList();
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      // default current year on page load.
      if (!params.year && !this.isInitialYearSet) {
        this.changeQueryParams({ year: Number(new Date().getFullYear()) });
        this.yearControl.setValue(Number(new Date().getFullYear()));
        return;
      }
      this.isInitialYearSet = true;
      // reset params if only month present
      if (!params.year && params.month) {
        this.changeQueryParams({ month: null });
        return;
      }
      this.setMonth(Number(params.year));
      this.reportList$ = this.achReportService.getAchReportList(params).pipe(map(res => this.reportList = res));
    });
  }

  openReportAnalytics(item) {
    if (this.role === Constants.Role.ADMIN) {
      const modalRef =
        this.modalService.open(AccountReportComponent, { centered: true, windowClass: 'ach-report-modal' });
      modalRef.result.catch(res => res);
      modalRef.componentInstance.payoutObject = item;
      modalRef.result.then(res => {
        this.router.navigate(['./', item.date, res.payoutToId], {
          relativeTo: this.activatedRoute,
          queryParams: { companyName: res.companyName, date: item.date, payoutAmount: res.payoutAmount, businessName: res.businessName }
        });
      });
    } else {
      this.vendorPartnerRedirection(item);
    }

  }

  vendorPartnerRedirection(item) {
    let userData;
    this.sessionService.getUserData().pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      userData = res;
      const userId = userData.company ? userData.company._id : userData._id;
      this.router.navigate(['./', item.date, userId], {
        relativeTo: this.activatedRoute,
        queryParams: { companyName: 'Report', date: item.date, payoutAmount: item.payoutAmount }
      });
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  changeQueryParams(params) {
    changeQueryParams({ ...params }, this.activatedRoute, this.router);
  }

  changeYear(yearValue) {
    this.changeQueryParams({ year: yearValue || null, month: null, page: null });
    this.monthControl.setValue(null);
  }

  setControls(params) {
    this.yearControl.setValue(params.year ? Number(params.year) : null);
    this.monthControl.setValue(params.month ? params.month : null);
  }

  pageChange(page) {
    this.changeQueryParams({ page });
  }

  setMonth(yearValue) {
    if (yearValue) {
      this.monthList = getMonthList(Number(yearValue));
    } else {
      this.monthList = [];
    }
  }

  changeMonth(monthValue) {
    this.changeQueryParams({ month: monthValue ? monthValue.id : null, page: null });
  }


}
