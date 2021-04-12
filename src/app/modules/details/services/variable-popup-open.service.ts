import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { changeQueryParams } from '@app/core/utils/common.util';
import { ActivatedRoute, Router } from '@angular/router';
import { VariableInfoPopupComponent } from '@app/shared/variable-info-popup/variable-info-popup/variable-info-popup.component';

@Injectable()
export class VariablePopupOpenService {

    constructor(
        private readonly modalService: NgbModal, private readonly router: Router,
        private readonly route: ActivatedRoute) { }

    openVaribalePopup(variablePopupData) {
        const { preQuoteDetails, categoryAndEventName, varibaleApiParams, productAndVendorName, eventTimezone } = variablePopupData;
        const modalref =
            this.modalService.open(VariableInfoPopupComponent, {
                backdrop: 'static',
                size: 'xl', windowClass: 'modal-extra-large', centered: true
            });
        modalref.componentInstance.preQuoteDetails = preQuoteDetails;
        modalref.componentInstance.categoryAndEventName = {
            categoryName: categoryAndEventName.categoryName,
            eventName: categoryAndEventName.eventName
        };
        modalref.componentInstance.varibaleApiParams = varibaleApiParams;
        modalref.componentInstance.productAndVendorName = productAndVendorName;
        modalref.componentInstance.eventTimezone = eventTimezone;
        modalref.result.then(() => this.resetQueryParams({ eventId: null }))
            .catch(() => this.resetQueryParams({ eventId: null }));
    }

    getVariableApiParams(productData) {
        return {
            product: productData._id, category: productData.category._id,
            subCategory: productData.subCategory._id,
            vendor: productData.company._id,
            event: ''
        };
    }
    resetQueryParams(params) {
        changeQueryParams(params, this.route, this.router);
    }

    getProductAndVendorName(product) {
        return {
            productName: product.name,
            vendorName: product.company.name
        };
    }
}
