import { Injectable, Output, EventEmitter } from '@angular/core';
import { RequestService } from '@core/http/request-service';
import { Constants } from '@app/config/constant';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs/internal/observable/throwError';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line:max-line-length
import { SharedConfirmationPopupComponent } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup/shared-confirmation-popup.component';
import { preparePhoneFormat } from '@app/core/utils/common.util';

@Injectable()
export class VendorManagementService {
    @Output() public manageReviewList = new EventEmitter(false);
    constructor(
        private readonly requestService: RequestService,
        private readonly router: Router,
        private readonly loaderService: LoaderService,
        private readonly modalService: NgbModal
    ) { }

    getVendorList(type: string, params?: Params) {
        this.loaderService.start();
        const vendorListUrl = `${Constants.ENDPOINTS.adminVendorManagement}/${type}`;
        return this.requestService.get<IApiSuccess>(vendorListUrl, params)
            .pipe(
                map(res => {
                    this.loaderService.stop();
                    return res.data;
                }
                )
            );
    }

    getVendorById(id: string) {
        return this.requestService.get<IApiSuccess>(`${Constants.ENDPOINTS.adminVendorManagement}/${id}`)
            .pipe(
                map(res => {
                    return res.data;
                }
                )
            );
    }

    redirect(params, pending?: string) {
        pending = pending || '';
        this.router.navigate([`/admin/vendor-management/${pending}`], { queryParams: params });
    }

    rejectVendor(id: string) {
        return this.requestService.delete(`${Constants.ENDPOINTS.adminVendorManagement}/${id}/reject`);
    }

    acceptVendor(id: string, data) {
        if (!data.yearlySubscriptionFee) {
            data.yearlySubscriptionFee = 0;
        }
        if (!data.setupFee) {
            data.setupFee = 0;
        }
        return this.requestService.patch<IApiSuccess>(`${Constants.ENDPOINTS.adminVendorManagement}/${id}/accept`, data)
            .pipe(map(res => {
                return res;
            }), catchError(error => {
                return throwError(error);
            }));
    }

    changeVendorStatus(id: string, status: number) {
        return this.requestService.patch(`${Constants.ENDPOINTS.adminVendorManagement}/${id}/status`, { status });
    }

    updateVendorDetails(vendorId, updatePayload) {
        updatePayload.phone = preparePhoneFormat(updatePayload.phone, updatePayload.countryCode);
        this.loaderService.start();
        return this.requestService.put<IApiSuccess>(`${Constants.ENDPOINTS.adminVendors}/${vendorId}`, updatePayload)
            .pipe(map(res => {
                this.loaderService.stop();
                return res;
            }), catchError(error => {
                this.loaderService.stop();
                return throwError(error);
            }));
    }

    getVendorAnalyticsId(id: string) {
        return this.requestService.get<IApiSuccess>(`${Constants.ENDPOINTS.adminVendors}/${id}/analytics`)
            .pipe(
                map(res => {
                    return res.data;
                }
                )
            );
    }

    getVendorRatingNReviewList(params: Params) {
        this.loaderService.start();
        const endpoint = `${Constants.ENDPOINTS.adminReviews}/${params.companyId}`;
        return this.requestService.get<IApiSuccess>(endpoint, params)
            .pipe(
                map(res => {
                    this.loaderService.stop();
                    return res.data;
                }
                )
            );
    }

    openConfirmationPopup(options?) {
        const modalRef = this.modalService.open(SharedConfirmationPopupComponent);
        modalRef.componentInstance.leftButton = Constants.DELETE_QUOTE.leftButton;
        modalRef.componentInstance.rightButton = Constants.DELETE_QUOTE.rightButton;
        modalRef.componentInstance.text = Constants.DELETE_QUOTE.text;
        modalRef.componentInstance.title = (options) ? options.title : Constants.DELETE_QUOTE.title;
        return modalRef;
    }

    deleteReview(id: string) {
        return this.requestService.delete<IApiSuccess>(`${Constants.ENDPOINTS.adminDeleteReview}/${id}`)
            .pipe(
                map(res => {
                    return res.data;
                }
                )
            );
    }

    removeLocation(vendorId, locationId) {
        return this.requestService.delete(`${Constants.ENDPOINTS.adminVendors}/${vendorId}/company/location/${locationId}`)
            .pipe(map(res => res));
    }

    updateLocation(vendorId, locationId, payload) {
        return this.requestService.patch(`${Constants.ENDPOINTS.adminVendors}/${vendorId}/company/location/${locationId}`, payload)
            .pipe(map(res => res));
    }

    getVendorName(vendorId) {
        return this.getVendorById(vendorId).pipe(map(res => {
            return {
                vendorName: res.company ? res.company.name : ''
            };
        }));
    }

    pendingVendorRedirect(params) {
        this.router.navigate([`/admin/pending-vendors`], { queryParams: params });
    }

}
