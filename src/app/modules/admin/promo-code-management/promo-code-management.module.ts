import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { PromoCodeManagementRoutingModule } from './promo-code-management-routing.module';
import { PromoCodeManagementListComponent } from './promo-code-management-list/promo-code-management-list.component';
import { SharedSearchModule } from '@app/shared/shared-search/shared-search.module';
import { SortByFilterModule } from '@app/shared/sort-by-filter/sort-by-filter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssociateVendorsComponent } from './associate-vendors/associate-vendors.component';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { PromoCodeSaveComponent } from './promo-code-save/promo-code-save.component';
// import { SharedDateTimepickerModule } from '@app/shared/shared-date-timepicker/shared-date-timepicker.module';
import { DpDatePickerModule } from 'ng2-date-picker';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { CapitalizeInputModule } from '@app/shared/directives/capitalize-input/capitalize-input.module';


@NgModule({
  declarations: [
    PromoCodeManagementListComponent,
    AssociateVendorsComponent,
    PromoCodeSaveComponent
  ],
  imports: [
    CommonModule,
    PromoCodeManagementRoutingModule,
    SharedSearchModule,
    SortByFilterModule,
    // SharedDateTimepickerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedConfirmationPopupModule,
    DpDatePickerModule,
    NgxMaskModule.forRoot(),
    PaginationModule,
    CapitalizeInputModule
  ],
  entryComponents: [AssociateVendorsComponent]
})
export class PromoCodeManagementModule { }
