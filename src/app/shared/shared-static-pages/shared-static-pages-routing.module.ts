import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutDetailComponent } from './about-detail/about-detail.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PlannerTermsServiceComponent } from './planner-terms-service/planner-terms-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


const routes: Routes = [ {
  path: 'about',
  component: AboutDetailComponent
}, {
  path: 'faq',
  component: FaqComponent
}, {
  path: 'contact-us',
  component: ContactUsComponent
},
{
  path: 'terms-of-service',
  component: PlannerTermsServiceComponent
},
{
  path: 'privacy-policy',
  component: PrivacyPolicyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedStaticPagesRoutingModule { }
