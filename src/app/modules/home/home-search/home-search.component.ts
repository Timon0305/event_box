import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@app/core/services/loader.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '@app/config/constant';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  providers: [LoaderService]
})

export class HomeSearchComponent implements OnInit {
  searchForm: FormGroup;
  homeSearch = Constants.SEARCH_CONSTANTS.HOMESEARCH;
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly sessionService: SessionManagerService
  ) {
    this.searchForm = this.formBuilder.group({
      keyword: null,
      location: null,
      latitude: null,
      longitude: null
    });
  }

  ngOnInit() {
  }

  submitSearch() {
    this.sessionService.setCurrentLocaton({ ...this.searchForm.value });
    this.router.navigate(['/search'], {
      queryParams: { ...this.searchForm.value, ...Constants.SET_SEARCH_PARAMETER, ...Constants.ELASTIC_SEARCH_PAGINATION }
    });
  }

}
