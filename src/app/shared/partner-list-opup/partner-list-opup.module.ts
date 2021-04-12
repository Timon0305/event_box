import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerListPopupComponent } from './partner-list-popup/partner-list-popup.component';
import { PartnerListService } from '@app/modules/admin/partner-list/partner-list.service';
import { InfiniteScrollModule } from '@app/shared/infinite-scroll/infinite-scroll.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [PartnerListPopupComponent],
  imports: [
    CommonModule,
    NgbModule,
    InfiniteScrollModule,
    FormsModule, ReactiveFormsModule
  ], entryComponents: [PartnerListPopupComponent],
  providers: [PartnerListService]
})
export class PartnerListOpupModule { }
