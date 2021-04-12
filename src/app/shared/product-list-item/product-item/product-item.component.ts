import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailApiService } from '@app/modules/details/services/detail-api.service';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Constants } from '@app/config/constant';
import { FavouriteService } from '@app/modules/planner/favourite/favourite.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SearchService } from '@app/modules/search/services/search.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  providers: [DetailApiService, FavouriteService]
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() product;
  @Input() productId;
  @Input() referrer;
  @Input() productSearchBy;
  @Input() fromSearch;
  @Input() fromOtherProducts;
  pages = Constants.PAGES;
  travelType = Constants.SEARCH_BY;
  isLocationExist = false;
  getMiles;
  public readonly destroyed$ = new Subject();
  constructor(
    private readonly router: Router, private readonly ngZone: NgZone,
    private readonly detailApiService: DetailApiService,
    private readonly sessionService: SessionManagerService,
    private readonly favService: FavouriteService,
    private readonly searchService: SearchService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.product = { _id: this.productId, ...this.product };
    this.isLocationExist = this.searchService.isLocation();
    this.getMiles = (this.product.milesArray && this.product.milesArray.length) ? Math.min.apply('', this.product.milesArray) : '';
  }

  navigateDetailPage(id) {
    const { location = null, latitude = null, longitude = null } = this.route.snapshot.queryParams;
    this.ngZone.run(() => {
      this.router.navigate(['details', id],
        {
          queryParams: {
            fromSearch: this.fromSearch || null, categoryName: this.route.snapshot.queryParams.categoryName || null,
            subCategoryName: this.fromSearch ? this.route.snapshot.queryParams.subCategoryName : null,
            longitude, location, latitude
          }
        });
    });
  }

  markAsFav(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const url = this.router.url.split('?');
    if (this.detailApiService.isUserLoggedIn(url[0])
      && this.sessionService.getRole() === Constants.Role.PLANNER) {
      this.checkIfFavorite();
    }
  }

  get isVendor() {
    return this.sessionService.getRole() === Constants.Role.VENDOR;
  }

  get isFavourite() {
    return this.sessionService.getUserId() ?
      this.product.favirotesFor.indexOf(this.sessionService.getUserId()) >= 0 :
      false;
  }

  checkIfFavorite() {
    if (this.isFavourite) {
      const modalRef = this.favService.openConfirmationPopup(this.product);
      modalRef.result.then(res => {
        if (!res) {
          return this.favService.toggleFavourite(this.product).pipe(takeUntil(this.destroyed$)).subscribe();
        }
      }).catch();
    } else {
      this.favService.toggleFavourite(this.product).subscribe();
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
