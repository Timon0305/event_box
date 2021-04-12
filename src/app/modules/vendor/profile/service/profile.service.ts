import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IModalMetaData } from '@app/models/popUpMeta';

// tslint:disable-next-line: max-line-length
import { SharedConfirmationPopupComponent } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup/shared-confirmation-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ProfileService {

  constructor(readonly request: RequestService, readonly modalService: NgbModal) { }

  addLocation(payload) {
    return this.request.post(Constants.ENDPOINTS.locations, payload).pipe(map(res => res));
  }

  removeLocation(locationId) {
    return this.request.delete(`${Constants.ENDPOINTS.locations}/${locationId}`).pipe(map(res => res));
  }

  updateLocation(vendorId, locationId, payload) {
    let locationUrl = `${Constants.ENDPOINTS.locations}/${locationId}`;
    if (vendorId) {
      locationUrl = `${Constants.ENDPOINTS.adminVendors}/${vendorId}/company/location/${locationId}`;
    }
    return this.request.patch(locationUrl, payload).pipe(map(res => res));
  }

  openConfirmationPopup(modalMetaData: IModalMetaData) {
    const modalRef = this.modalService.open(SharedConfirmationPopupComponent, { backdrop: 'static' });
    modalRef.componentInstance.text = modalMetaData.text;
    modalRef.componentInstance.title = modalMetaData.title;
    modalRef.componentInstance.leftButton = modalMetaData.leftButton;
    modalRef.componentInstance.rightButton = modalMetaData.rightButton;
    return modalRef.result;
  }

  deleteBankDetail() {
    return this.request.delete(`${Constants.ENDPOINTS.createBankDetail}`).pipe(map(res => res));
  }
}
