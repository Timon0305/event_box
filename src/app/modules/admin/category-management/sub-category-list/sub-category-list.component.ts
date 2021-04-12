import { Component, OnInit } from '@angular/core';
import { CategoryManagementService } from '../services/category-management.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { Observable } from 'rxjs';
import { IPaginatedData } from '@app/models/IApiResponse';
import { IModalMetaData } from '@app/models/popUpMeta';
import { SharedConfirmationPopupService } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { Messages } from '@app/config/messages';
import { AlertService } from '@app/modules/alert-messages/alert.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {
  params: Params;
  public subCategoryObservable: Observable<IPaginatedData>;
  constructor(
    private readonly categoryManagementService: CategoryManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly router: Router,
    private readonly sharedConfirmationPopupService: SharedConfirmationPopupService,
    private readonly flash: AlertService
  ) { }

  ngOnInit() {
    this.loaderService.start();
    this.subCategoryObservable = this.categoryManagementService.getCategoryList(undefined, true);
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      this.subCategoryObservable = this.categoryManagementService.getCategoryList(params, true);
    });
  }

  pageChange(pageNumber) {
    this.params = Object.assign({}, this.params);
    this.params.page = pageNumber;
    this.categoryManagementService.redirect(this.params, true);
  }

  searchCaregory(keyword) {
    this.params = Object.assign({});
    this.params.filter = keyword;
    this.categoryManagementService.redirect(this.params, true);
  }

  edit(categoryId: string, id: string) {
    this.router.navigateByUrl(`/admin/category-management/sub-categories/edit/${categoryId}/${id}`);
    return;
  }

  askChangeSubCategoryStatus(categoryId: string, id: string, status) {
    this.sharedConfirmationPopupService.showPopup({
      title: `${status ? 'Inactivate' : 'Activate'} Sub Category`,
      text: `Do you want to ${status ? 'Inactivate' : 'Activate'} this Sub Category?`,
      leftButton: 'Cancel',
      rightButton: 'Yes'
    } as IModalMetaData).result.then(res => {
      if (res) {
        this.changeSubCategoryStatus(categoryId, id, status ? 0 : 1);
      }
    });
  }

  changeSubCategoryStatus(categoryId: string, id: string, status) {
    this.loaderService.start();
    this.categoryManagementService.changeSubCategoryStatus(categoryId, id, status).subscribe(
      res => {
        this.loaderService.stop();
        this.flash.showSuccess(Messages.SUCCESS.adminSubCategoryStatus);
        this.subCategoryObservable = this.categoryManagementService.getCategoryList(this.params, true);
      },
      err => {
        this.loaderService.stop();
      }
    );
  }

  askDelete(categoryId: string, id: string) {
    this.sharedConfirmationPopupService.showPopup({
      title: `Delete Sub Category`,
      text: `Do you want to delete this sub category?`,
      leftButton: 'Cancel',
      rightButton: 'Yes'
    } as IModalMetaData).result.then(res => {
      if (res) {
        this.delete(categoryId, id);
      }
    });
  }

  delete(categoryId: string, id: string) {
    this.loaderService.start();
    this.categoryManagementService.deleteSubCategory(categoryId, id).subscribe(
      res => {
        this.flash.showSuccess(Messages.SUCCESS.adminSubCategoryDelete);
        this.loaderService.stop();
        this.subCategoryObservable = this.categoryManagementService.getCategoryList(this.params, true);
      },
      res => {
        this.loaderService.stop();
      }
    );
  }

}
