import { Component, OnInit, OnDestroy } from '@angular/core';
import { RatingReviewService } from '@app/modules/planner/rating-review/services/rating-review.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '@app/config/constant';
import { IPaginatedData } from '@app/models/IApiResponse';
import { CheckRoles } from '@app/core/utils/common.util';
import { Subject } from 'rxjs/internal/Subject';
import { VendorManagementService } from '@app/modules/admin/vendor-management/services/vendor-management.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-myall-product-rating-review-list',
  templateUrl: './myall-product-rating-review-list.component.html',
  styleUrls: ['./myall-product-rating-review-list.component.scss'],
  providers: [RatingReviewService]
})
export class MyallProductRatingReviewListComponent implements OnInit, OnDestroy {
  public productRatingReviewObservable: Observable<IPaginatedData>;
  private readonly destroyed$ = new Subject();
  sortByData = Constants.RATINGS_N_REVIEWS_VENDOR_FILTERS;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  number = Constants.NUMBER;
  paramsLength = 0;
  params: Params;
  isAdmin = false;
  companyId;
  vendorId;
  vendor;

  constructor(
    private readonly ratingReviewService: RatingReviewService,
    private readonly route: ActivatedRoute,
    private readonly checkRoles: CheckRoles,
    private readonly vendorManagementService: VendorManagementService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paramsLength = Object.keys(params).length;
      this.params = params;
      this.vendorId = params.vendor;
      this.getRatingNReviews();
    });
    this.getRatingNReviews();
    this.vendorManagementService.manageReviewList.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      if (data) {
        this.processAdmin();
      }
    });
  }

  getRatingNReviews() {
    this.isAdmin = this.checkRoles.isAdmin();
    if (this.isAdmin) {
      this.processAdmin();
    } else {
      this.processNonAdmin();
    }
  }

  processAdmin() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    if (this.vendorId) {
      this.vendorManagementService.getVendorById(this.vendorId).pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.vendor = res;
      });
    }
    this.productRatingReviewObservable = this.vendorManagementService.getVendorRatingNReviewList(
      {...this.params, companyId: this.companyId }
    );
  }

  processNonAdmin() {
    this.productRatingReviewObservable = this.ratingReviewService.getVendorRatingNReviewList(this.params);
  }

  pageChange(pageNumber) {
    this.params = { ...this.params, page: pageNumber };
    this.ratingReviewService.redirect(this.params);
  }

  search(keyword) {
    this.params = Object.assign({});
    this.params.filter = keyword;
    this.ratingReviewService.redirect(this.params);
  }

  sortFilterChange($event) {
    this.params = { ...this.params, ...$event };
    this.ratingReviewService.redirect(this.params);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
