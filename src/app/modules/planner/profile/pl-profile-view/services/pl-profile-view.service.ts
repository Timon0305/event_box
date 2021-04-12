import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/operators';
import { IModalMetaData } from '@app/models/popUpMeta';
// tslint:disable-next-line: max-line-length
import { SharedConfirmationPopupComponent } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup/shared-confirmation-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class PlProfileViewService {

  constructor(readonly request: RequestService, readonly modalService: NgbModal) { }

  changeDefaultCreditCard(payload) {
    return this.request.put(`${Constants.ENDPOINTS.createCardDetails}/${payload}`).pipe(map(res => res));
  }

  deleteCreditCard(payload) {
    return this.request.delete(`${Constants.ENDPOINTS.createCardDetails}/${payload}`).pipe(map(res => res));
  }

  openConfirmationPopup(modalMetaData: IModalMetaData) {
    const modalRef = this.modalService.open(SharedConfirmationPopupComponent, { backdrop: 'static' });
    modalRef.componentInstance.text = modalMetaData.text;
    modalRef.componentInstance.title = modalMetaData.title;
    modalRef.componentInstance.leftButton = modalMetaData.leftButton;
    modalRef.componentInstance.rightButton = modalMetaData.rightButton;
    return modalRef.result;
  }
}
