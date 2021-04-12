import { Component, OnInit } from '@angular/core';

import { SaveSubCategoryFormHelper } from './save-sub-category.form';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { CategoryManagementService } from '../services/category-management.service';
import { Messages } from '@app/config/messages';
import { Observable } from 'rxjs';
import { IPaginatedData } from '@app/models/IApiResponse';

@Component({
  selector: 'app-save-sub-category',
  templateUrl: './save-sub-category.component.html',
  styleUrls: ['./save-sub-category.component.scss'],
  providers: [SaveSubCategoryFormHelper]
})
export class SaveSubCategoryComponent implements OnInit {
  saveSubCategoryForm: FormGroup;
  public categoryObservable$: Observable<IPaginatedData>;
  subCategoryId: string;
  categoryId: string;
  formEdit = false;
  constructor(
    private readonly formHelper: SaveSubCategoryFormHelper,
    private readonly categoryManagementService: CategoryManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly flash: AlertService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.categoryObservable$ = this.categoryManagementService.getCategoryList();
    this.activatedRoute.params.subscribe(params => {
      this.subCategoryId = params.id;
      this.categoryId = params.categoryId;
      if (this.subCategoryId && this.categoryId) {
        this.categoryManagementService.getSubCategory(this.categoryId, this.subCategoryId).subscribe(
          data => {
            this.formEdit = true;
            this.saveSubCategoryForm.patchValue({categoryName: data._id, name: data.subcategory_name});
          }
        );
      }
    });
    this.saveSubCategoryForm = this.formHelper.buildForm();
  }

  get f() {
    return this.saveSubCategoryForm;
  }

  saveSubCategory() {
    const data = this.saveSubCategoryForm.value;
    this.categoryManagementService.saveSubCategory(data, this.subCategoryId).subscribe(
      _ => {
        this.flash.showSuccess(Messages.SUCCESS.adminSubCategorySave);
        this.loaderService.stop();
        this.router.navigateByUrl('/admin/category-management/sub-categories');
      },
      _ => {
        this.loaderService.stop();
      }
    );
  }

}
