import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceContainerDirective } from './price-container.directive';



@NgModule({
  declarations: [PriceContainerDirective],
  imports: [
    CommonModule
  ],
  exports: [PriceContainerDirective]
})
export class PriceContainerModule { }
