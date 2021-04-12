import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewQuoteComponent } from './admin-view-quote/admin-view-quote.component';
import { ReverseArrayPipeModule } from '@app/shared/reverse-array-pipe/reverse-array-pipe.module';



@NgModule({
  declarations: [AdminViewQuoteComponent],
  imports: [
    CommonModule,
    ReverseArrayPipeModule
  ], entryComponents: [AdminViewQuoteComponent],
  exports: [AdminViewQuoteComponent]
})
export class AdminViewQuoteModule { }
