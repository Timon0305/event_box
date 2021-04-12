import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedStaticPagesRoutingModule } from './shared-static-pages-routing.module';
import { AboutDetailComponent } from './about-detail/about-detail.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterModule } from '@app/modules/footer/footer.module';
import { HeaderSubmenuModule } from '@app/modules/header-submenu/header-submenu.module';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PlannerTermsServiceComponent } from './planner-terms-service/planner-terms-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';




@NgModule({
  declarations: [AboutDetailComponent, ContactUsComponent, FaqComponent, TermsConditionsComponent,
     PlannerTermsServiceComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    SharedStaticPagesRoutingModule,
    NgbModule,
    FooterModule,
    HeaderSubmenuModule
  ]
})
export class SharedStaticPagesModule { }
