import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryManagementListComponent } from './category-management-list/category-management-list.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SaveSubCategoryComponent } from './save-sub-category/save-sub-category.component';

const routes: Routes = [
  {
    path: '', component: CategoryManagementListComponent
  },
  {
    path: 'edit/:id', component: EditCategoryComponent,
    data: {
      breadcrumb: BreadCrumb.adminCategoryUpdate
    }
  },
  {
    path: 'sub-categories', component: SubCategoryListComponent
  },
  {
    path: 'sub-categories/add', component: SaveSubCategoryComponent,
    data: {
      breadcrumb: BreadCrumb.adminSubCategoryAdd
    }
  },
  {
    path: 'sub-categories/edit/:categoryId/:id', component: SaveSubCategoryComponent,
    data: {
      breadcrumb: BreadCrumb.adminSubCategoryUpdate
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryManagementRoutingModule { }
