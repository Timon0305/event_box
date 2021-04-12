import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { IPaginatedData } from '@app/models/IApiResponse';
import { Observable } from 'rxjs/internal/Observable';
import { Constants } from '@app/config/constant';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RatingReviewService } from '../services/rating-review.service';
import { ViewRatingReviewComponent } from '../view-rating-review/view-rating-review.component';
// tslint:disable-next-line: max-line-length
import { SharedRatingReviewPopupComponent } from '@app/shared/shared-rating-review-popup/shared-rating-review-popup/shared-rating-review-popup.component';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { LoaderService } from '@app/core/services/loader.service';
import { AddEditEventService } from '../../events/services/add-edit-event/add-edit-event.service';

@Component({
  selector: 'app-rating-review-list',
  templateUrl: './rating-review-list.component.html',
  styleUrls: ['./rating-review-list.component.scss'],
  providers: [RatingReviewService, AddEditEventService]
})
export class RatingReviewListComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  public ratingNReviewList: Observable<IPaginatedData>;
  sortByData = Constants.RATINGS_N_REVIEWS_FILTERS;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  queryParams = { type: Constants.ORDER_TYPES.FULFILLED_ORDERS };
  number = Constants.NUMBER;
  paramsLength = 0;
  params: Params;

  constructor(
    private readonly ratingReviewService: RatingReviewService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly flash: AlertService,
    private readonly loaderService: LoaderService,
    private readonly modalService: NgbModal,
    private readonly eventService: AddEditEventService
  ) { }

  ngOnInit() {
    this.ratingNReviewList = this.ratingReviewService.getRatingNReviewList();
    this.route.queryParams.subscribe(params => {
      this.paramsLength = Object.keys(params).length;
      this.params = params;
      this.ratingNReviewList = this.ratingReviewService.getRatingNReviewList(params);
    });
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

  viewRatingNReview(productId, eventId) {
    this.loaderService.start();
    this.ratingReviewService.getProductRatingNReview(productId, eventId).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.loaderService.stop();
      const modalRef = this.modalService.open(ViewRatingReviewComponent, { centered: true });
      modalRef.componentInstance.data = res;
    });
  }


  writeReview(fulfilledOrder) {
    const modalRef = this.modalService.open(SharedRatingReviewPopupComponent, { centered: true });
    modalRef.result.then(res => {
      if (res) {
        const payload = {
          rating: res.value.rating, review: res.value.review,
          product: fulfilledOrder.products._id, event: fulfilledOrder.events._id
        };
        this.ratingReviewService.postReview(payload).pipe(takeUntil(this.destroyed$)).subscribe(data => {
          this.flash.showSuccess(Messages.SUCCESS.reviewSend);
          this.ratingNReviewList = this.ratingReviewService.getRatingNReviewList(this.params);
        }, error => {
          this.flash.showError(Messages.ERROR.unreachableServer);
        });
      }
    });
  }

  plannerViewEvent(eventId) {
    this.eventService.plnnerViewEventDetails(eventId, {navigationId: 5});
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
