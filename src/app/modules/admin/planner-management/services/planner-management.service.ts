import { Injectable } from '@angular/core';
import { RequestService } from '@core/http/request-service';
import { Constants } from '@app/config/constant';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class PlannerManagementService {

  constructor(
    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly loaderService: LoaderService
  ) { }

  getPlannerList(params?: Params) {
    this.loaderService.start();
    return this.requestService.get<IApiSuccess>(`${Constants.ENDPOINTS.plannerManagement}`, params)
      .pipe(
        map(res => {
          this.loaderService.stop();
          return res;
        }
        )
      );
  }

  redirect(params) {
    this.router.navigate([`/admin/planner-management`], { queryParams: params });
  }

  getPlannerById(id) {
    this.loaderService.start();
    return this.requestService.get<IApiSuccess>(`${Constants.ENDPOINTS.plannerManagement}/${id}`)
      .pipe(
        map(res => {
          this.loaderService.stop();
          return res.data;
        }
        )
      );
  }

  getPlannerName(id) {
    return this.getPlannerById(id).pipe(map(res => {
      return {
        plannerName: `${res.firstName} ${res.lastName}`
      };
    }));
  }

  activeInactivePlanner(id: string, status: number) {
    status = (status) ? 0 : 1;
    return this.requestService.patch(`${Constants.ENDPOINTS.plannerManagement}/${id}/status`, { status });
  }

  getAnalyticsData(plannerId, params= {}) {
    return this.requestService.get<IApiSuccess>(`/admin/planners/${plannerId}/analytics`, params).pipe(map(res => res.data));
  }
}
