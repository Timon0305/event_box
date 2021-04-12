import { Component, OnInit, OnDestroy, Output, EventEmitter, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorManagementService } from '../services/vendor-management.service';
import { Constants } from '@app/config/constant';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from '@app/core/services/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ProfileService } from '@app/modules/vendor/profile/service/profile.service';
import { AddLocationComponent } from '@app/modules/vendor/profile/add-locations/add-location/add-location.component';
import { DOCUMENT } from '@angular/common';
import { copyAnyUrl } from '@app/core/utils/common.util';
import { environment } from '@environments/environment';


@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss'],
  providers: [VendorManagementService, ProfileService]
})
export class ViewVendorComponent implements OnInit, OnDestroy {
  vendorId;
  @Output() fetchLocations = new EventEmitter();
  readonly destroyed$ = new Subject();
  public vendor;
  blankData = Constants.BLANK_HYPHEN;
  percentSign = Constants.PROMO_CODE.PERCENT_SIGN;
  vendorEdit = Constants.APPLICATION_ROUTES.admin.vendorEdit;
  planFrequency = Constants.SHOW_PLAN_FREQUENCY;
  adminRoutes = Constants.APPLICATION_ROUTES;
  numbers = Constants.NUMBER;
  ratingNreviewObservable$;
  referralUrl;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly vendorManagementService: VendorManagementService,
    private readonly loader: LoaderService,
    private readonly modalService: NgbModal,
    private readonly profileService: ProfileService,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) { }

  ngOnInit() {
    this.vendorId = this.activatedRoute.snapshot.paramMap.get('id');
    this.vendorManagementService.getVendorById(this.vendorId).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.vendor = res;
      const baseUrl = `${environment.appUrl}?referredBy=`;
      if (this.vendor && this.vendor.company) {
        this.referralUrl = `${baseUrl}${this.vendor.company._id}`;
      }
      this.fetchReviewList();
      this.vendorManagementService.manageReviewList.pipe(takeUntil(this.destroyed$)).subscribe(data => {
        if (data) {
          this.fetchReviewList();
        }
      });
    });
  }

  redirectoPlanner() {
    this.router.navigate(['/admin/planner-management'], { queryParams: { referredBy: this.vendor.company._id } });
  }

  openPdf() {
    window.open(this.vendor.company.termsPath);
  }

  fetchReviewList() {
    this.ratingNreviewObservable$ = this.vendorManagementService.getVendorRatingNReviewList(
      { limit: this.numbers.five, companyId: this.vendor.company._id }
    );
  }

  async deleteLocation(vendorId, locationId, index) {
    const deleteConfirmation = await this.profileService.openConfirmationPopup(Constants.DELETE_POPUP);
    if (deleteConfirmation) {
      this.loader.start();
      this.vendorManagementService.removeLocation(vendorId, locationId)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.loader.stop();
          this.vendor.locations.splice(index, 1);
        }, error => {
          this.loader.stop();
        });
    }
    return;
  }

  editLocation(vendorId, location) {
    const modalRef = this.openLocationModal();
    modalRef.componentInstance.location = location;
    modalRef.componentInstance.vendorId = vendorId;
  }

  openLocationModal() {
    const modalRef = this.modalService.open(AddLocationComponent, { backdrop: 'static', keyboard: false, centered: true });
    modalRef.result.then(res => {
      if (res) {
        this.fetchLocations.emit();
        this.vendorManagementService.getVendorById(this.vendorId).pipe(takeUntil(this.destroyed$)).subscribe(result => {
          this.vendor = result;
        });
      }
    });
    return modalRef;
  }

  copyId() {
    copyAnyUrl('companyId', this.document);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
