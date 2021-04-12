import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { IApiSuccess } from '@app/models/IApiResponse';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { LoaderService } from '../loader.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  headerCount$ = new BehaviorSubject<{ messages: number, notifications: number }>({ messages: 0, notifications: 0 });
  isResponsiveFilter = false;
  isAutoLocationSet = false;

  constructor(
    readonly request: RequestService, private readonly sessionService: SessionManagerService,
    private loader: LoaderService, private http: HttpClient) { }

  getAllCategories() {
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.categories).pipe(map(res => res.data));
  }

  getAllStates() {
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.getStates).pipe(map(res => res.data));
  }

  getProductServiceList(options, isVendor) {
    const endPoint = isVendor ? Constants.ENDPOINTS.products : Constants.ENDPOINTS.adminProducts;
    this.loader.start();
    return this.request.get<IApiSuccess>(endPoint, options).pipe(map(res => {
      this.loader.stop();
      return res;
    }), catchError(error => {
      this.loader.stop();
      return throwError(error);
    }));
  }

  getProductById(id, isAdmin?) {
    const endpoint = isAdmin ? `${Constants.ENDPOINTS.adminProducts}/${id}` : `${Constants.ENDPOINTS.products}/${id}`;
    return this.request.get(endpoint).pipe(map(res => res));
  }

  getPublicProductServiceRecord(id) {
    return this.request.get(`${Constants.ENDPOINTS.productsView}/${id}`).pipe(map(res => res));
  }

  getProductReviews(id, options?) {
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.reviews}/${id}`, options).pipe(map(res => res.data));
  }

  getHeaderCountApi() {
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.headerCount}`).pipe(map(res => {
      this.headerCount$.next(res.data.unread);
      return res;
    }));
  }

  getHeaderCount() {
    return this.headerCount$;
  }

  getDashboardCounts() {
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.dashboard}`).pipe(map(res => res));
  }

  getCountryCodes() {
    return this.http.get('assets/data/country-codes.json').pipe(map(res =>
      res
    ));
  }

  getResponsive(pageInnerWidth) {
    this.isResponsiveFilter = false;
    if (window.innerWidth <= pageInnerWidth) {
      this.isResponsiveFilter = true;
    }
    return this.isResponsiveFilter;
  }

  get IsAutoLocation() {
    return this.isAutoLocationSet;
  }

  set setIsAutoLocation(isLocationSet) {
    this.isAutoLocationSet = isLocationSet;
  }

}
