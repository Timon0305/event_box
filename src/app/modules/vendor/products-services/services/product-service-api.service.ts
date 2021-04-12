import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IApiSuccess } from '@app/models/IApiResponse';
import { IModalMetaData } from '@app/models/popUpMeta';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line:max-line-length
import { SharedConfirmationPopupComponent } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup/shared-confirmation-popup.component';

@Injectable()
export class ProductServiceApiService {

  constructor(readonly request: RequestService, private readonly modalService: NgbModal) { }

  uploadProductImages(files) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('file[]', file);
    }
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.productImages, formData, true).pipe(map(res => res));
  }

  createNewProduct(payload) {
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.products, payload).pipe(map(res => res));
  }

  updateProduct(payload, productId) {
    return this.request.patch(`${Constants.ENDPOINTS.products}/${productId}`, payload).pipe(map(res => res));
  }

  changeProductStatus(status, productId) {
    return this.request.patch<IApiSuccess>(`${Constants.ENDPOINTS.archiveProduct}/${productId}`, status).pipe(map(res => res));
  }

  openPopup(status, type) {
    const metaData: IModalMetaData = Constants.getArchivepopUpData(status, type);
    const modalRef = this.modalService.open(SharedConfirmationPopupComponent, { backdrop: 'static' });
    modalRef.componentInstance.leftButton = metaData.leftButton;
    modalRef.componentInstance.rightButton = metaData.rightButton;
    modalRef.componentInstance.imageSrc = metaData.imageSrc;
    modalRef.componentInstance.text = metaData.text;
    modalRef.componentInstance.title = metaData.title;
    return modalRef.result;
  }

  getCsvParams(params) {
    let isArchive;
    if (params.isArchive) {
      isArchive = params.isArchive === 'true';
    } else {
      isArchive = null;
    }
    return {
      exportType: Constants.EXPORTS_DATA.products.exportType,
      type: params.type || null,
      isArchive
    };
  }
}
