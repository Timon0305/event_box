import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginatedData } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { Params, ActivatedRoute } from '@angular/router';
import { RatingReviewService } from '@app/modules/planner/rating-review/services/rating-review.service';
import { CommonService } from '@app/core/services/common/common.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from '@app/core/services/loader.service';
import { BreadCrumb } from '@app/config/breadcrumbs';

@Component({
  selector: 'app-view-all-product-rating-review-list',
  templateUrl: './view-all-product-rating-review-list.component.html',
  styleUrls: ['./view-all-product-rating-review-list.component.scss'],
  providers: [RatingReviewService]
})
export class ViewAllProductRatingReviewListComponent implements OnInit, OnDestroy {

  public productRatingReviewObservable: Observable<IPaginatedData>;
  private readonly destroyed$ = new Subject();
  sortByData = Constants.COMMON_RATINGS_N_REVIEWS_VENDOR_FILTERS;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  number = Constants.NUMBER;
  paramsLength = 0;
  params: Params;
  productDetail$;
  ratingNreviewObservable$;
  constructor(
    private readonly ratingReviewService: RatingReviewService,
    private readonly route: ActivatedRoute,
    private readonly commonService: CommonService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.ratingNreviewObservable$ = this.commonService.getProductReviews(this.route.snapshot.params.id);
    this.route.queryParams.subscribe(params => {
      this.loaderService.start();
      this.paramsLength = Object.keys(params).length;
      this.params = params;
      this.ratingNreviewObservable$ = this.commonService.getProductReviews(this.route.snapshot.params.id, this.params);
      this.loaderService.stop();
    });
    this.getProductDetail();

  }

  getProductDetail() {
    this.productDetail$ = this.commonService.getProductById(this.route.snapshot.params.id);
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

  dynamicBreadcrumb(data) {
    return BreadCrumb.vendorRatingNReviewProductService({name: `${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}`, _id: data._id});
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
