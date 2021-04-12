import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSearchModule } from '@shared/shared-search/shared-search.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { CategoryManagementListComponent } from './category-management-list/category-management-list.component';
import { CategoryManagementService } from './services/category-management.service';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SaveSubCategoryComponent } from './save-sub-category/save-sub-category.component';
import { PaginationModule } from '@app/shared/pagination/pagination.module';


@NgModule({
  declarations: [CategoryManagementListComponent, EditCategoryComponent, SubCategoryListComponent, SaveSubCategoryComponent],
  imports: [
    CommonModule,
    CategoryManagementRoutingModule,
    SharedSearchModule, NgbModule,
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    PaginationModule
  ],
  providers: [CategoryManagementService]
})
export class CategoryManagementModule { }
