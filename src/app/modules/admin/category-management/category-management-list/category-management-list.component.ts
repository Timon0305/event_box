import { Component, OnInit } from '@angular/core';
import { CategoryManagementService } from '../services/category-management.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { Observable } from 'rxjs';
import { IPaginatedData } from '@app/models/IApiResponse';

@Component({
  selector: 'app-category-management-list',
  templateUrl: './category-management-list.component.html',
  styleUrls: ['./category-management-list.component.scss']
})
export class CategoryManagementListComponent implements OnInit {
  params: Params;
  public categoryObservable: Observable<IPaginatedData>;
  constructor(
    private readonly categoryManagementService: CategoryManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.loaderService.start();
    this.categoryObservable = this.categoryManagementService.getCategoryList();
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      this.categoryObservable = this.categoryManagementService.getCategoryList(params);
    });
  }

  pageChange(pageNumber) {
    this.params = Object.assign({}, this.params);
    this.params.page = pageNumber;
    this.categoryManagementService.redirect(this.params);
  }

  searchCaregory(keyword) {
    this.params = Object.assign({});
    this.params.filter = keyword;
    this.categoryManagementService.redirect(this.params);
  }

  edit(id: string) {
    this.router.navigateByUrl(`/admin/category-management/edit/${id}`);
    return;
  }

}
