import { Injectable } from '@angular/core';
import { IModalMetaData } from '@app/models/popUpMeta';
import { SharedConfirmationPopupComponent } from './shared-confirmation-popup/shared-confirmation-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class SharedConfirmationPopupService {
    constructor(
        private readonly modalService: NgbModal
    ) { }

    showPopup(metaData: IModalMetaData, backdrop = false) {
        const modalRef = this.modalService.open(SharedConfirmationPopupComponent, {
            backdrop: !backdrop ? 'static' : true,
            centered: true
        });
        modalRef.componentInstance.leftButton = metaData.leftButton;
        modalRef.componentInstance.rightButton = metaData.rightButton;
        modalRef.componentInstance.imageSrc = metaData.imageSrc;
        modalRef.componentInstance.text = metaData.text;
        modalRef.componentInstance.title = metaData.title;
        return modalRef;
    }
}
