import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { FavouriteService } from '../favourite.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Constants } from '@app/config/constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { IPaginatedData } from '@app/models/IApiResponse';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.scss'],
  providers: [FavouriteService]
})
export class FavouriteListComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  public favouritesList: Observable<IPaginatedData>;
  sortByData = Constants.FAVOURITES_LIST_FILTER;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  number = Constants.NUMBER;
  paramsLength = 0;
  params: Params;

  constructor(
    private readonly favouriteService: FavouriteService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit() {
    this.favouritesList = this.favouriteService.getFavouriteList();
    this.route.queryParams.subscribe(params => {
      this.paramsLength = Object.keys(params).length;
      this.params = params;
      this.favouritesList = this.favouriteService.getFavouriteList(params);
    });
  }

  pageChange(pageNumber) {
    this.params = { ...this.params, page: pageNumber };
    this.favouriteService.redirect(this.params);
  }

  search(keyword) {
    this.params = Object.assign({});
    this.params.filter = keyword;
    this.favouriteService.redirect(this.params);
  }

  sortFilterChange($event) {
    this.params = { ...this.params, ...$event };
    this.favouriteService.redirect(this.params);
  }

  navigateDetailPage(id) {
    this.router.navigateByUrl(`/details/${id}`);
  }

  unFavourite(productObj) {
    const modalRef = this.favouriteService.openConfirmationPopup(productObj);
    modalRef.result.then(res => {
      if (!res) {
        this.favouriteService.toggleFavourite(productObj, true).pipe(takeUntil(this.destroyed$)).subscribe(
          data => {
            this.favouritesList = this.favouriteService.getFavouriteList();
          }
        );
      }
    }).catch();
  }

  ngOnDestroy() {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

}
