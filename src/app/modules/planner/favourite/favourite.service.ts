import { Injectable, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line:max-line-length
import { SharedConfirmationPopupComponent } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup/shared-confirmation-popup.component';
import { Constants } from '@app/config/constant';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { LoaderService } from '@app/core/services/loader.service';
import { Params, Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { CommonService } from '@app/core/services/common/common.service';

@Injectable()
export class FavouriteService implements OnDestroy {
  readonly destroyed$ = new Subject();

  constructor(
    private readonly modalService: NgbModal,
    private readonly request: RequestService,
    private readonly loader: LoaderService,
    private readonly router: Router,
    private readonly sessionService: SessionManagerService,
    private readonly commonService: CommonService
  ) { }

  openConfirmationPopup(product) {
    const modalRef = this.modalService.open(SharedConfirmationPopupComponent);
    modalRef.componentInstance.leftButton = Constants.UNFAVORITE_PRODUCT_SERVICE.leftButton;
    modalRef.componentInstance.rightButton = Constants.UNFAVORITE_PRODUCT_SERVICE.rightButton;
    modalRef.componentInstance.imageSrc = Constants.UNFAVORITE_PRODUCT_SERVICE.imageSrc;
    modalRef.componentInstance.text = Constants.UNFAVORITE_PRODUCT_SERVICE.text;
    modalRef.componentInstance.title = Constants.UNFAVORITE_PRODUCT_SERVICE.title;
    return modalRef;
  }

  toggleFavourite(product, productFrom?) {
    this.loader.start();
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.favirotes, { productId: product._id })
      .pipe(takeUntil(this.destroyed$), map(res => {
        if (!productFrom) {
          product.favirotesFor = res.data.favirotesFor;
        }
        this.getHeaderCountApi();
        this.loader.stop();
        return res;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }

  getHeaderCountApi() {
    if (this.sessionService.getToken()) {
      this.commonService.getHeaderCountApi().pipe(takeUntil(this.destroyed$))
        .subscribe();
    }
  }

  getFavouriteList(params?: Params) {
    const favouriteListUrl = `${Constants.ENDPOINTS.favirotes}`;
    return this.request.get<IApiSuccess>(favouriteListUrl, params)
      .pipe(
        map(res => {
          return res.data;
        }
        )
      );
  }

  redirect(params) {
    this.router.navigate([`/planner/favourites`], { queryParams: params });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
