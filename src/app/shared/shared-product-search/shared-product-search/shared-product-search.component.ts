import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SearchService } from '@app/modules/search/services/search.service';


@Component({
  selector: 'app-shared-product-search',
  templateUrl: './shared-product-search.component.html',
  providers: [SearchService]
})
export class SharedProductSearchComponent implements OnInit {
  @Input() public form;
  @Input() formType;
  constructor(
    private readonly searchService: SearchService
  ) { }

  ngOnInit() {
  }


}
