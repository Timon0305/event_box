import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginSignupService } from '@app/modules/login-signup/services/login-signup.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { SearchService } from '@modules/search/services/search.service';
import { IElasticSearch } from '@app/models/IElasticSearch';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { getProductListCount } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SearchService]
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  products: IElasticSearch;
  public isMenuCollapsed = true;
  productsCount: number;
  homePageData;
  pages = Constants.PAGES;
  sortBy = Constants.SORT_FIELDS.newArrivals;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly loginSignupService: LoginSignupService,
    private readonly flash: AlertService,
    private readonly searchService: SearchService) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.token) {
      this.loginSignupService.verifyUser({ id: this.route.snapshot.queryParams.token })
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.flash.showSuccess(Messages.SUCCESS.tokenVerified);
        }, error => {
        });
    }
    if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.from) {
      this.flash.showSuccess(Messages.SUCCESS.companyVerified);
    }      
    this.getHomePageData();
  }

  getHomePageData() {
    this.searchService.getHomePageData().
      pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.homePageData = res.data;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
