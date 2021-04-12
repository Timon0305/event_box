import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductServiceRoutingModule } from './add-product-service-routing.module';
import { AddVideoLinkComponent } from './add-video-link/add-video-link.component';
import { AddProductServiceImagesComponent } from './add-product-service-images/add-product-service-images.component';
import { AddProductServiceLocationComponent } from './add-product-service-location/add-product-service-location.component';
import { AddProductServiceComponent } from './add-product-service/add-product-service.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { PaySetupSubscriptionFeesModule } from '../../pay-setup-subscription-fees/pay-setup-subscription-fees.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [AddVideoLinkComponent, AddProductServiceImagesComponent, AddProductServiceLocationComponent, AddProductServiceComponent],
  imports: [
    CommonModule,
    AddProductServiceRoutingModule,
    NgSelectModule,
    ReactiveFormsModule, FormsModule,
    NgxMaskModule.forRoot(),
    BreadcrumbsModule,
    PaySetupSubscriptionFeesModule,
    NgbModule,
    NgxUiLoaderModule
  ]
})
export class AddProductServiceModule { }
