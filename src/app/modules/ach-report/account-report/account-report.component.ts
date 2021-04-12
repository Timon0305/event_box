import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AchReportService } from '../ach-report.service';
import { map } from 'rxjs/internal/operators/map';
import { trackByObjectId } from '@app/core/utils/common.util';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-report',
  templateUrl: './account-report.component.html',
  styleUrls: ['./account-report.component.scss']
})
export class AccountReportComponent implements OnInit {
  @Input() payoutObject;
  dateReport$;
  dateReport = [];
  pageData: { totalPages: number, page: number };
  options;
  @ViewChild('modalBody', { static: true }) listContainer: ElementRef<HTMLElement>;
  trackByFn = trackByObjectId;
  loading = false;
  constructor(
    private readonly route: ActivatedRoute, private readonly router: Router,
    readonly activeModal: NgbActiveModal, private readonly achReportService: AchReportService) { }
  ngOnInit() {
    this.options = { root: this.listContainer.nativeElement };
    this.getReportData();
  }

  getReportData(params = {}) {
    this.loading = true;
    this.dateReport$ = this.achReportService.getDateAchReportList(this.payoutObject.date, params).pipe(
      map(res => {
        this.pageData = { totalPages: res.totalPages, page: res.page };
        this.dateReport = this.dateReport.concat(res.docs);
        this.loading = false;
        return res;
      }), catchError(error => {
        this.loading = false;
        return error;
      })
    );
  }

  scrolled() {
    if (this.pageData && this.pageData.page && this.pageData.totalPages > this.pageData.page) {
      this.getReportData({ page: this.pageData.page + 1 });
    }
  }

  navigateToDetail(item) {
    const payoutToId = item.company ? item.company._id : item.user._id;
    const companyName = item.company ? item.company.name : `${item.user.firstName} ${item.user.lastName}`;
    const businessName = item.user && item.user.partnerDetails ? item.user.partnerDetails.businessName 
    : item.company ? item.company.name : '';
    this.activeModal.close({
      payoutToId,
      payoutAmount: item.payoutAmount, companyName, businessName
    });
  }


}
