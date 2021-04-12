import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '@app/core/services/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/config/constant';
import { LoaderService } from '@app/core/services/loader.service';
import { ProductServiceApiService } from '../../services/product-service-api.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { CheckRoles } from '@app/core/utils/common.util';
import { VendorManagementService } from '@app/modules/admin/vendor-management/services/vendor-management.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-product-service',
  templateUrl: './view-product-service.component.html',
  styleUrls: ['./view-product-service.component.scss'],
  providers: [ProductServiceApiService, VendorManagementService]

})
export class ViewProductServiceComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject();
  ratingNreviewObservable$;
  productServicesEditRoute = Constants.APPLICATION_ROUTES.vendor.editProductServices;
  pages = Constants.PAGES;
  constNumber = Constants.NUMBER;
  productRatingNReviewRoute = Constants.APPLICATION_ROUTES.vendor.productRatingNReviewRoute;
  isAdmin = false;
  vendorName = '';
  constructor(
    private readonly location: Location,
    private readonly loader: LoaderService, private readonly productApiService: ProductServiceApiService,
    private readonly commonService: CommonService, private readonly route: ActivatedRoute,
    private readonly router: Router, private readonly vendorMgmtService: VendorManagementService,
    private readonly checkRole: CheckRoles) { }
  productServiceDetail$;
  ngOnInit() {
    this.isAdmin = this.checkRole.isAdmin();
    this.getProductServiceData();
    this.getVendorName();
  }

  toggleArchive(data) {
    const modalRef = this.productApiService.openPopup(data.isArchive, data.type);
    modalRef.then(toggle => {
      if (!toggle) {
        this.loader.start();
        this.productApiService.changeProductStatus({ isArchive: !data.isArchive }, data._id)
          .pipe(takeUntil(this.destroyed$))
          .subscribe(res => {
            this.loader.stop();
            data.isArchive = res.data.isArchive;
            if (data.isArchive) {
              this.router.navigateByUrl(`/vendor/products-services`);
            }
          }, error => this.loader.stop());
      }
    });
  }

  getProductServiceData() {
    this.productServiceDetail$ = this.commonService.getProductById(this.route.snapshot.params.id, this.isAdmin);
    this.ratingNreviewObservable$ = this.commonService.getProductReviews(this.route.snapshot.params.id, { limit: Constants.NUMBER.ten });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  dynamicBreadcrumb(data) {
    return BreadCrumb.vendorViewProductService(data.name);
  }

  adminDynamicBreadcrumbs(data) {
    return BreadCrumb.adminViewProductService(data.name);
  }

  getVendorName() {
    if (this.route.snapshot.params.vendorId) {
      this.vendorMgmtService.getVendorName(this.route.snapshot.params.vendorId)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.vendorName = res.vendorName;
        });
    }
  }
  back() {
    this.location.back();
  }
}
