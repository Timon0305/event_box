import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProductFormHelperService } from '../../services/product-form-helper.service';
import { FormGroup } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { VendorService } from '@app/modules/vendor/services/vendor.service';
import { CommonService } from '@app/core/services/common/common.service';
import { Messages } from '@app/config/messages';
import { AddProductServiceImagesComponent } from '../add-product-service-images/add-product-service-images.component';
import { ProductServiceApiService } from '../../services/product-service-api.service';
import { Subject } from 'rxjs/internal/Subject';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { filter } from 'rxjs/internal/operators/filter';
// tslint:disable-next-line: max-line-length
import { PaySetupSubscriptionFeesComponent } from '@app/modules/vendor/pay-setup-subscription-fees/pay-setup-subscription-fees/pay-setup-subscription-fees.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product-service',
  templateUrl: './add-product-service.component.html',
  styleUrls: ['./add-product-service.component.scss'],
  providers: [ProductFormHelperService, VendorService, ProductServiceApiService]
})
export class AddProductServiceComponent implements OnInit, OnDestroy {
  @ViewChild(AddProductServiceImagesComponent, { static: false }) imageComponent: AddProductServiceImagesComponent;
  productServiceForm: FormGroup;
  readonly destroyed$ = new Subject();
  productType = Constants.PRODUCT_TYPE;
  serviceType = Constants.SERVICE_TYPE;
  locationsObservable$;
  categoriesObservable$;
  previousUrl;
  messages = Messages.validationMessage;
  productFormDetails = Constants.PRODUCT_FORM;
  subCategory;
  imagesUrl = [];
  user;
  productServiceData$;
  dynamicBreadcrumb;
  addFixedFooterClassSidebar = true;
  constructor(
    readonly alertService: AlertService, readonly router: Router, readonly loader: LoaderService,
    readonly formHelper: ProductFormHelperService, readonly vendorService: VendorService,
    readonly commonService: CommonService, readonly productApiService: ProductServiceApiService,
    readonly route: ActivatedRoute, private readonly modalService: NgbModal, private readonly sessionService: SessionManagerService,
    private readonly location: Location) { }

  ngOnInit() {
    this.subscribeRouteEvents();
    this.productServiceForm = this.formHelper.getProductForm();
    if (this.route.snapshot.params.id) {
      this.productServiceData$ = this.commonService.getProductById(this.route.snapshot.params.id).pipe(takeUntil(this.destroyed$));
      this.productServiceData$.subscribe(res => {
        if (res && res.data) {
          this.formHelper.patchProductForm(this.productServiceForm, res.data);
          this.categoriesObservable$ = this.commonService.getAllCategories().pipe(
            map((categories) => {
              this.subCategory = categories
                .filter(category => category._id === res.data.category._id)
                .map(({ children }) => children)[0];
              return categories;
            }));

          this.imagesUrl = res.data.images;
          this.dynamicBreadcrumb = BreadCrumb.vendorEditproducts(res.data.type === this.productType);
        }
      });
    } else {
      this.categoriesObservable$ = this.commonService.getAllCategories();
    }

    this.locationsObservable$ = this.vendorService.getVendorLocations();
    this.categoriesObservable$ = this.commonService.getAllCategories();
  }
  goBack() {
    this.location.back();
  }

  subscribeRouteEvents() {
    this.sessionService.getUserData().pipe(takeUntil(this.destroyed$), filter(res => !!res)).subscribe(res => {
      this.user = res;
      if (this.router.url.includes(Constants.APPLICATION_ROUTES.vendor.addProductServices) &&
        (this.user && this.user.company && this.user.company.memberPackage) &&
        (!this.user.company.memberPackage.setupFeePaid || !this.user.company.memberPackage.subscriptionPaid)) {
        this.openBankCardDetails();
      }
    });
  }

  openBankCardDetails() {
    const modalRef = this.modalService.open(PaySetupSubscriptionFeesComponent, { backdrop: 'static', keyboard: false, centered: true });
    modalRef.componentInstance.user = this.user;
    modalRef.result.then(res => {
      if (res) {
        this.router.navigateByUrl('/vendor/add-credit-card');
      } else {
        this.goBack();
      }
    }).catch();
  }

  submit() {
    if (this.isFormValid) {
      if (this.productServiceData$) {
        this.updateProduct();
      } else {
        this.createNewProduct();
      }
    }
  }



  createNewProduct() {
    this.loader.start();
    this.productApiService.createNewProduct(this.productServiceForm.value).pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.loader.stop();
        this.alertService.showSuccess(this.getSucessMessage());
        this.router.navigate(['/vendor/products-services'], { queryParams: { type: this.productServiceForm.value.type } });
      }, error => {
        this.loader.stop();
      });
  }

  updateProduct() {
    this.loader.start();
    this.productApiService.updateProduct(this.productServiceForm.value, this.route.snapshot.params.id).pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.loader.stop();
        this.alertService.showSuccess(this.getUpdateSuccessMessage());
        this.router.navigate(['/vendor/products-services'], { queryParams: { type: this.productServiceForm.value.type } });
      }, error => {
        this.loader.stop();
      });
  }

  getSucessMessage() {
    return (this.productServiceForm.value.type === this.productType ? Messages.SUCCESS.productCreate : Messages.SUCCESS.serviceCreate);
  }

  getUpdateSuccessMessage() {
    return (this.productServiceForm.value.type === this.productType ? Messages.SUCCESS.productUpdate : Messages.SUCCESS.serviceUpdate);
  }

  get f() {
    return this.productServiceForm;
  }

  categoryChanged(event) {
    this.productServiceForm.controls.subCategory.setValue(null);
    this.subCategory = event && event.children || [];
  }

  get isFormValid() {
    return this.productServiceForm.valid && !this.imageComponent.loading;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
