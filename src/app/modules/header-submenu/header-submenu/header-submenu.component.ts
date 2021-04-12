import { Component, OnInit, Input } from '@angular/core';
import { Router, Params } from '@angular/router';
import { CommonService } from '@app/core/services/common/common.service';
import { Constants } from '@app/config/constant';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { SearchService } from '@app/modules/search/services/search.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-header-submenu',
  templateUrl: './header-submenu.component.html',
  styleUrls: ['./header-submenu.component.scss'],
  providers: [SearchService]
})

export class HeaderSubmenuComponent implements OnInit {
  public isMenuCollapsed = true;
  categoriesObservable$;
  currentLocation: Params  = {...Constants.SET_LOCATION_PARAMETER};
  private readonly destroyed$ = new Subject();
  @Input() isHomePage;
  @Input() isPublicPages;
  constructor(
    private readonly commonService: CommonService,
    private readonly router: Router,
    private readonly sessionService: SessionManagerService,
    private readonly searchService: SearchService
  ) { }

  ngOnInit() {
    this.categoriesObservable$ = this.commonService.getAllCategories();
  }

  searchCategory({categoryId, categoryName, subCategoryId, subCategoryName}) {

    this.sessionService.setResetFilter(true);
    this.sessionService.getCurrentLocaton().pipe(takeUntil(this.destroyed$)).subscribe(
      res => {
        this.currentLocation = res;
    });
    
    this.router.navigate(['/search'], {
      queryParams: {
        category: categoryId,
        subCategory: subCategoryId,
        subCategoryName,
        categoryName,
        ...Constants.SET_SEARCH_PARAMETER,
        ...Constants.ELASTIC_SEARCH_PAGINATION,
        ...this.searchService.getLocationParam(),
        ... this.currentLocation
      }
    });
  }



}
