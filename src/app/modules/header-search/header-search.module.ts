import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedGoogleLocationModule } from '@app/shared/shared-google-location/shared-google-location.module';
import { SharedProductSearchModule } from '@app/shared/shared-product-search/shared-product-search.module';


@NgModule({
  declarations: [HeaderSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedGoogleLocationModule,
    SharedProductSearchModule
  ],
  exports: [HeaderSearchComponent],
})
export class HeaderSearchModule { }
