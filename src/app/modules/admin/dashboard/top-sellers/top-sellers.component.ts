import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { SharedDateFilterComponent } from '@app/shared/shared-date-filter/shared-date-filter/shared-date-filter.component';
import { map } from 'rxjs/internal/operators/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getTopFiveListingElements } from '@app/core/utils/common.util';

@Component({
  selector: 'app-top-sellers',
  templateUrl: './top-sellers.component.html',
  styleUrls: ['./top-sellers.component.scss'],
  providers: [DashboardService]
})
export class TopSellersComponent implements OnInit {
  @Input() topSellers;
  topFiveSellers;
  topSellersFiltered$;
  @ViewChild(SharedDateFilterComponent, { static: false }) dateFilterComponent: SharedDateFilterComponent;

  constructor(private readonly dashboardService: DashboardService, readonly modalService: NgbModal) { }

  ngOnInit() {
    this.topFiveSellers = getTopFiveListingElements(this.topSellers);
  }

  quoteDateFilter(event) {
    const { dateFrom = null, dateTo = null } = event;
    this.getFilteredTopSellers({ dateFrom, dateTo });
  }

  openViewAll(content) {
    this.modalService.dismissAll();
    this.modalService.open(content, { centered: true });

  }

  getFilteredTopSellers(params = {}) {
    this.topSellersFiltered$ = this.dashboardService.getAnalytics(params).pipe(map(res => {
      this.topFiveSellers = getTopFiveListingElements(res.topSellers);
      this.topSellers = res.topSellers;
    }));
  }

}
