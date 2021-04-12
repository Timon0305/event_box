import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { SharedDateFilterComponent } from '@app/shared/shared-date-filter/shared-date-filter/shared-date-filter.component';
import { map } from 'rxjs/internal/operators/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getTopFiveListingElements } from '@app/core/utils/common.util';

@Component({
  selector: 'app-categories-sales',
  templateUrl: './categories-sales.component.html',
  styleUrls: ['./categories-sales.component.scss'],
  providers: [DashboardService]
})
export class CategoriesSalesComponent implements OnInit {
  @Input() categories;
  salesCategories$;
  @Input() topSellers;
  topFiveCategories;
  @ViewChild(SharedDateFilterComponent, { static: false }) dateFilterComponent: SharedDateFilterComponent;

  constructor(private readonly dashboardService: DashboardService,
              readonly modalService: NgbModal) { }

  ngOnInit() {
    this.topFiveCategories = getTopFiveListingElements(this.categories);
  }


  quoteDateFilter(event) {
    const { dateFrom = null, dateTo = null } = event;
    this.getFilteredCategories({ dateFrom, dateTo });
  }

  getFilteredCategories(params = {}) {
    this.salesCategories$ = this.dashboardService.getAnalytics(params).pipe(map(res => {
      this.topFiveCategories = getTopFiveListingElements(res.salesByCategories);
      this.categories = res.salesByCategories;
    }));

  }

  openViewAll(content) {
    this.modalService.dismissAll();
    this.modalService.open(content, { centered: true });
  }

}
