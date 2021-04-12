import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlProfileViewRoutingModule } from './pl-profile-view-routing.module';
import { PlProfileViewComponent } from './pl-profile-view/pl-profile-view.component';
import { SharedProfileViewModule } from '@app/shared/shared-profile-view/shared-profile-view.module';
import { CardDetailViewComponent } from './card-detail-view/card-detail-view.component';
import { PlProfileViewService } from './services/pl-profile-view.service';
import { SharedConfirmationPopupModule } from '@app/shared/shared-confirmation-popup/shared-confirmation-popup.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [PlProfileViewComponent, CardDetailViewComponent],
  imports: [
    CommonModule,
    PlProfileViewRoutingModule,
    SharedProfileViewModule,
    SharedConfirmationPopupModule,
    NgbModule
  ], providers:  [PlProfileViewService]
})
export class PlProfileViewModule { }
