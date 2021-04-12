import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IApiSuccess } from '@app/models/IApiResponse';
import { IModalMetaData } from '@app/models/popUpMeta';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line:max-line-length
import { SharedConfirmationPopupComponent } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup/shared-confirmation-popup.component';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class QuoteRequestFolderService {

  constructor(private readonly request: RequestService, private readonly modalService: NgbModal,
              private readonly fb: FormBuilder) { }

  getQuoteRequestFolderList(options?) {
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.quotes, options).pipe(map(res => res));
  }

  createViewForm() {
    return this.fb.group({
      notes: ['', Validators.compose([Validators.required])],
    });
  }
  updateNotes(quoteId, payload) {
    return this.request.put<IApiSuccess>(`${Constants.ENDPOINTS.quotes}/${quoteId}`, payload).pipe(map(res => res));
  }

  updateQuoteQuantity(quoteId, counter) {
    return this.request.patch<IApiSuccess>(`${Constants.ENDPOINTS.updateQuotesQuantity}/${quoteId}`, counter).pipe(map(res => res));
  }

  updateQuoteStatus(quoteId, status) {
    return this.request.patch<IApiSuccess>(`${Constants.ENDPOINTS.updateQuotesStatus}/${quoteId}`, status).pipe(map(res => res));
  }

  openPopup(metaData: IModalMetaData) {
    const modalRef = this.modalService.open(SharedConfirmationPopupComponent, { backdrop: 'static', centered: true });
    modalRef.componentInstance.leftButton = metaData.leftButton;
    modalRef.componentInstance.rightButton = metaData.rightButton;
    modalRef.componentInstance.imageSrc = metaData.imageSrc;
    modalRef.componentInstance.text = metaData.text;
    modalRef.componentInstance.title = metaData.title;
    return modalRef;
  }

  updateSelectedQuotes(ids, status) {
    return this.request.patch<IApiSuccess>(`${Constants.ENDPOINTS.updateQuotesStatus}`, { ids, status }).pipe(map(res => res));
  }

  deleteQuotes(ids: Array<string>) {
    return this.request.deleteWithBody<IApiSuccess>(`${Constants.ENDPOINTS.quotes}`, { ids }).pipe(map(res => res));
  }
}
