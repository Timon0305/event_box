import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerSidebarComponent } from './partner-sidebar/partner-sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PartnerSidebarComponent],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    NgbModule
  ]
})
export class PartnerModule { }
