import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartListComponent } from './shopping-cart-list/shopping-cart-list.component';
import { PromoCodeSectionComponent } from './promo-code-section/promo-code-section.component';
import { SharedCartTableModule } from '@app/shared/shared-cart-table/shared-cart-table.module';
import { PromoAssociateVendorsPipe } from './promo-associate-vendors.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '@app/shared/breadcrumbs/breadcrumbs.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ShoppingCartListComponent, PromoCodeSectionComponent,
    PromoAssociateVendorsPipe,
    ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    SharedCartTableModule,
    FormsModule, ReactiveFormsModule,
    BreadcrumbsModule,
    NgbModule
  ], entryComponents: []
})
export class ShoppingCartModule { }
