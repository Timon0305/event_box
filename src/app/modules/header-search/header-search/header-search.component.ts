import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '@app/core/services/loader.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Constants } from '@app/config/constant';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';


@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html'
})
export class HeaderSearchComponent implements OnInit, OnDestroy {
  headerSearchForm: FormGroup;
  readonly destroyed$ = new Subject();
  headerSearch = Constants.SEARCH_CONSTANTS.HEADERSEARCH;
  constructor(
    private readonly loaderService: LoaderService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly sessionService: SessionManagerService
  ) {
    this.headerSearchForm = this.formBuilder.group({
      keyword: null,
      location: null,
      latitude: null,
      longitude: null
    });
  }
  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.headerSearchForm.patchValue({
        keyword: params.keyword || null,
        location: params.location || null,
        latitude: params.latitude || null,
        longitude: params.longitude || null
      });
    });
  }

  submitSearch() {
    this.sessionService.setResetFilter(true);
    this.router.navigate(['/search'], {
      queryParams: {...this.headerSearchForm.value, ...Constants.SET_SEARCH_PARAMETER,
        ...Constants.ELASTIC_SEARCH_PAGINATION}
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
