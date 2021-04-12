import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IModalMetaData } from '@app/models/popUpMeta';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line: max-line-length
import { SharedConfirmationPopupComponent } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup/shared-confirmation-popup.component';
import { IApiSuccess } from '@app/models/IApiResponse';
import { LoaderService } from '@app/core/services/loader.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CheckRoles, getDatetoISOFormat } from '@app/core/utils/common.util';
import { Router, ActivatedRoute } from '@angular/router';
import { ExportService } from '@app/core/services/common/export.service';

@Injectable()
export class QuotesSectionService {

  constructor(
    private readonly exportService: ExportService,
    private readonly router: Router, private readonly route: ActivatedRoute,
    private readonly request: RequestService, private readonly checkRole: CheckRoles,
    private readonly modalService: NgbModal, private readonly loaderService: LoaderService) { }

  getQuoteList(options) {
    this.loaderService.start();
    let endpoint = Constants.ENDPOINTS.quotes;
    if (this.checkRole.isAdmin()) {
      endpoint = Constants.ENDPOINTS.adminQuotes;
      const id = this.getPlannerId(this.route.snapshot);
      if (id) {
        options = {
          ...options,
          role: Constants.Role.PLANNER,
          id
        };
      }
    }
    const event = this.geteventViewId(this.route.snapshot);
    if (event) {
      options = { ...options, event };
    }
    return this.request.get(endpoint, options).pipe(map(res => {
      this.loaderService.stop();
      return res;
    }), catchError(error => {
      this.loaderService.stop();
      return throwError(error);
    }));
  }

  updateQuoteStatus(options) {
    this.loaderService.start();
    return this.request.patch(Constants.ENDPOINTS.updateQuoteStatus, options)
      .pipe(map(res => {
        this.loaderService.stop();
        return res;
      }), catchError(error => {
        this.loaderService.stop();
        return throwError(error);
      }));
  }

  openConfirmationPopup(modalMetaData: IModalMetaData) {
    const modalRef = this.modalService.open(SharedConfirmationPopupComponent, { backdrop: 'static' });
    modalRef.componentInstance.text = modalMetaData.text;
    modalRef.componentInstance.title = modalMetaData.title;
    modalRef.componentInstance.leftButton = modalMetaData.leftButton;
    modalRef.componentInstance.rightButton = modalMetaData.rightButton;
    if (modalMetaData.imageSrc) {
      modalRef.componentInstance.imageSrc = modalMetaData.imageSrc;
    }
    return modalRef.result;
  }

  deleteQuote(options) {
    this.loaderService.start();
    return this.request.deleteWithBody(Constants.ENDPOINTS.quotes, options).pipe(map(res => {
      this.loaderService.stop();
      return res;
    }), catchError(error => {
      this.loaderService.stop();
      return throwError(error);
    }));
  }

  getQuoteById(quoteId) {
    this.loaderService.start();
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.quotes}/${quoteId}`).pipe(map(res => {
      this.loaderService.stop();
      return res.data;
    }), catchError(error => {
      this.loaderService.stop();
      return throwError(error);
    }));
  }

  getReportData({ plannerId, type, isAdmin, dateRangeComponent }) {
    let reportPayload;
    reportPayload = {
      exportType: 'quotes',
      type,
      ...dateRangeComponent.getDateFromDateTo()
    };
    const id = (isAdmin && plannerId);
    if (id) {
      reportPayload = {
        ...reportPayload,
        role: Constants.Role.PLANNER,
        id
      };
    }
    const event = this.geteventViewId(this.route.snapshot);
    if (event) {
      reportPayload = {
        ...reportPayload,
        event
      };
    }
    if (reportPayload.dateFrom && reportPayload.dateTo) {
      reportPayload = getDatetoISOFormat(Constants.DATE_RANGE_FIELDS, { ...reportPayload });
    }
    return this.exportService.export(reportPayload).pipe(map(res => {
      dateRangeComponent.clearDate();
      return res;
    }));
  }

  getPlannerId(routeSnapshot) {
    return (routeSnapshot.parent && routeSnapshot.parent.parent ? routeSnapshot.parent.parent.params.plannerId : null);
  }

  geteventViewId(routeSnapshot) {
    return (routeSnapshot.parent && routeSnapshot.parent.parent ? routeSnapshot.parent.parent.params.eventViewId : null);
  }

  getOrderById(orderId) {
    return this.request.get<IApiSuccess>(`${Constants.ENDPOINTS.orders}/${orderId}`).pipe(map(res => res.data));
  }
}
