import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trackByObjectId } from '@app/core/utils/common.util';
import { environment } from '@environments/environment';
import { Constants } from '@app/config/constant';
import { ProductServiceApiService } from '../../services/product-service-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-service-table',
  templateUrl: './product-service-table.component.html',
  styleUrls: ['./product-service-table.component.scss'],
  providers: [ProductServiceApiService]
})
export class ProductServiceTableComponent implements OnInit {
  @Input() productServiceData;
  @Output() fetchList = new EventEmitter();
  @Output() toggleArchiveEvent = new EventEmitter();
  trackByFn = trackByObjectId;
  s3BaseUrl = environment.s3BaseUrl;
  @Input() paramsLength = 0;
  @Input() tabType: string;
  @Input() isVendor;
  productServicesEditRoute = Constants.APPLICATION_ROUTES.vendor.editProductServices;
  productType = Constants.PRODUCT_TYPE;
  serviceType = Constants.SERVICE_TYPE;
  productServiceRoute = Constants.APPLICATION_ROUTES.vendor.productsServices;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductServiceApiService, private readonly router: Router) { }

  ngOnInit() {
  }

  mapLocationData(arrOfLoc) {
    return arrOfLoc.map(({ location }) => {
      if (location) {
        return location.state;
      }
    }).join(', ');
  }

  mapLocationDataAdmin(arrofLoc) {
    return arrofLoc.map(({ state }) => {
        return state;
    }).join(', ');
  }

  pageChange(page) {
    this.fetchList.emit({ page });
  }

  toggleArchive(status, productId, type) {
    const modalRef = this.productService.openPopup(status, type);
    modalRef.then(res => {
      if (!res) {
        this.toggleArchiveEvent.emit({ status: !status, productId });
      }
    });
  }

  navigateToProductDetail(productId) {
    if (!this.isVendor) {
      this.router.navigate(['./', productId], {relativeTo: this.route});
    }
  }

}
