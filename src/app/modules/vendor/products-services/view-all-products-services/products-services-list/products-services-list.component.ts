import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonService } from '@app/core/services/common/common.service';
import { Constants } from '@app/config/constant';
import { changeQueryParams, isVendor } from '@app/core/utils/common.util';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { ProductServicesFiltersComponent } from '../product-services-filters/product-services-filters.component';
import { SharedSearchComponent } from '@app/shared/shared-search/shared-search/shared-search.component';
import { ProductServiceApiService } from '../../services/product-service-api.service';
import { LoaderService } from '@app/core/services/loader.service';
import { FormControl } from '@angular/forms';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { ExportService } from '@app/core/services/common/export.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { map } from 'rxjs/internal/operators/map';
import { VendorManagementService } from '@app/modules/admin/vendor-management/services/vendor-management.service';

@Component({
  selector: 'app-products-services-list',
  templateUrl: './products-services-list.component.html',
  styleUrls: ['./products-services-list.component.scss'],
  providers: [ProductServiceApiService, VendorManagementService]
})
export class ProductsServicesListComponent implements OnInit, OnDestroy {
  productType = Constants.PRODUCT_TYPE;
  serviceType = Constants.SERVICE_TYPE;
  tabType = '';
  typeControl: FormControl;
  productServiceList$;
  paramsLength = 0;
  dynamicBreadcrumb = BreadCrumb.adminProductServiceList;
  categoryObservable$;
  readonly destroyed$ = new Subject();
  addProduct = Constants.APPLICATION_ROUTES.vendor.addProductServices;
  isVendor = true;
  productAction = false;
  filterAction = false;
  queryParams;
  productServiceData;
  vendorName;
  @ViewChild(ProductServicesFiltersComponent, { static: false }) readonly filterComponent: ProductServicesFiltersComponent;
  @ViewChild(SharedSearchComponent, { static: false }) readonly searchComponent: SharedSearchComponent;
  constructor(
    private readonly vendorMgmtService: VendorManagementService,
    private readonly sessionService: SessionManagerService, private readonly exportService: ExportService,
    readonly productApiService: ProductServiceApiService, readonly route: ActivatedRoute,
    readonly router: Router, readonly commonService: CommonService, readonly loader: LoaderService) { }

  ngOnInit() {
    this.isVendor = isVendor(this.sessionService.getRole());
    this.typeControl = new FormControl('');
    this.categoryObservable$ = this.commonService.getAllCategories();
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      this.queryParams = {
        isArchive: params.isArchive,
        type: params.type
      };
      this.paramsLength = Object.keys(params).length;
      this.getProductList(params);
    });
    this.getSetTypeControl();
    this.getVendorName(this.route.snapshot.params.id);
  }

  getVendorName(vendorId) {
    if (vendorId) {
      this.vendorMgmtService.getVendorName(vendorId)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.vendorName = res.vendorName;
        });
    }
  }

  getSetTypeControl() {
    this.typeControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.tabType = value;
      this.switchTab();
    });
    this.typeControl.setValue(this.route.snapshot.queryParams.type || '');
  }
  switchTab() {
    changeQueryParams({ type: this.tabType || null }, this.route, this.router).then(() => {
      if (this.filterComponent) {
        this.filterComponent.setFieldsValue();
        this.searchComponent.setSearchControlValue();
      }
    });
  }

  search(filter) {
    let searchPayload: { [index: string]: string | null } = {
      filter: null,
      fields: null
    };
    if (filter) {
      searchPayload = { ...searchPayload, filter, fields: Constants.PRODUCT_SEARCH_FIELD };
    }
    this.updateQueryParams({ ...searchPayload, page: 1 });
  }

  getProductList(options) {
    this.productServiceList$ = this.commonService.getProductServiceList(options, this.isVendor)
      .pipe(map(res => this.productServiceData = res.data));
  }

  updateQueryParams(params = {}) {
    changeQueryParams({ ...params }, this.route, this.router);
  }

  toggleArchiveEvent(event) {
    this.loader.start();
    this.productApiService.changeProductStatus({ isArchive: event.status }, event.productId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.loader.stop();
        this.getProductList(this.route.snapshot.queryParams);
      }, error => this.loader.stop());
  }

  onProductActionBtn() {
    this.productAction = !(this.productAction);
  }

  onFilterBtn(event?) {
    this.filterAction = (!event) ? event : true;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  fetchReport() {
    let reportParams;
    reportParams = { ...this.productApiService.getCsvParams(this.queryParams) };
    if (this.route.snapshot.params.id) {
      reportParams = {
        ...reportParams,
        role: Constants.Role.VENDOR,
        id: this.route.snapshot.params.id
      };
    }
    this.exportService.export(reportParams)
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }

}
