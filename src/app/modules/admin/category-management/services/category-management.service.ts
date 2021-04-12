import { Injectable } from '@angular/core';
import { RequestService } from '@core/http/request-service';
import { Constants } from '@app/config/constant';
import { IApiSuccess } from '@app/models/IApiResponse';
import { map } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';

@Injectable()
export class CategoryManagementService {

  constructor(
    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly loaderService: LoaderService
  ) { }

  getCategoryList(paramsReceived?: Params, subCategory = false) {
    this.loaderService.start();
    let caretoryListUrl = `${Constants.ENDPOINTS.adminCategoryManagement}`;
    if (subCategory) {
      caretoryListUrl = `${Constants.ENDPOINTS.adminSubCategoryManagement}`;
    }

    const params = Object.assign({}, paramsReceived);
    if (params.order < 1) {
      params.sort = `-${params.sort}`;
    }
    return this.requestService.get<IApiSuccess>(caretoryListUrl, params)
      .pipe(
        map(res => {
          this.loaderService.stop();
          return res.data;
        }
        )
      );
  }

  getCategory(id: string) {
    return this.requestService.get<IApiSuccess>(`${Constants.ENDPOINTS.adminCategoryManagement}/${id}`)
      .pipe(
        map(res => {
          this.loaderService.stop();
          return res.data;
        }
        )
      );
  }

  getSubCategory(categoryId: string, id: string) {
    return this.requestService.get<IApiSuccess>(`${Constants.ENDPOINTS.adminCategoryManagement}/${categoryId}/subcategories/${id}`)
      .pipe(
        map(res => {
          this.loaderService.stop();
          return res.data;
        }
        )
      );
  }

  redirect(params, subCategory = false) {
    let subCategiryUrl = '';
    if (subCategory) {
      subCategiryUrl = '/sub-categories';
    }
    this.router.navigate([`/admin/category-management${subCategiryUrl}`], { queryParams: params });
  }

  updateCategory(id: string, data) {
    return this.requestService.put(`${Constants.ENDPOINTS.adminCategoryManagement}/${id}`, data);
  }

  saveSubCategory(data, id?: string) {
    const categoryId = data.categoryName;
    if (id) {
      return this.requestService.put(`${Constants.ENDPOINTS.adminCategoryManagement}/${categoryId}/subcategory/${id}`, data);
    } else {
      return this.requestService.post(`${Constants.ENDPOINTS.adminCategoryManagement}/${categoryId}/subcategories`, data);
    }
  }

  deleteSubCategory(categoryId: string, id: string) {
    return this.requestService.delete(`${Constants.ENDPOINTS.adminCategoryManagement}/${categoryId}/subcategory/${id}`);
  }

  changeSubCategoryStatus(categoryId: string, id: string, status) {
    return this.requestService.patch(`${Constants.ENDPOINTS.adminCategoryManagement}/${categoryId}/subcategory/${id}/status`, { status });
  }
}
