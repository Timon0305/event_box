import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedBankDetailFormComponent } from './shared-bank-detail-form/shared-bank-detail-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NumberInputModule } from '../directives/number-input/number-input.module';

@NgModule({
  declarations: [SharedBankDetailFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    NumberInputModule
  ], exports: [SharedBankDetailFormComponent]
})
export class SharedBankDetailModule { }
