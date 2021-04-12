import { Component, OnInit } from '@angular/core';

import { EditCategoryFormHelper } from './edit-category.form';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { CategoryManagementService } from '../services/category-management.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  providers: [EditCategoryFormHelper]
})
export class EditCategoryComponent implements OnInit {
  editCategoryForm: FormGroup;
  categoryId: string;
  constructor(
    private readonly formHelper: EditCategoryFormHelper,
    private readonly categoryManagementService: CategoryManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly flash: AlertService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.loaderService.start();
      this.categoryId = params.id;
      if (this.categoryId) {
        this.categoryManagementService.getCategory(this.categoryId).subscribe(
          data => {
            this.editCategoryForm.patchValue(data);
          }
        );
      }
    });
    this.editCategoryForm = this.formHelper.buildForm();
  }

  get f() {
    return this.editCategoryForm;
  }

  updateCategory() {
    this.loaderService.start();
    const data = this.editCategoryForm.value;
    this.categoryManagementService.updateCategory(this.categoryId, data).subscribe(
      res => {
        this.flash.showSuccess(Messages.SUCCESS.adminCategoryUpdated);
        this.loaderService.stop();
        this.router.navigateByUrl('/admin/category-management');
      },
      err => {
        this.loaderService.stop();
      }
    );
  }
}
