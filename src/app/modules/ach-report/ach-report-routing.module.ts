import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportListingComponent } from '../ach-report/report-listing/report-listing.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: ReportListingComponent
},
{
  path: ':date/:payoutTo/orders/:orderId',
  canLoad: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.ADMIN, Constants.Role.VENDOR, Constants.Role.PARTNER],
  },
  loadChildren: () => import('@modules/vendor/quotes/quote-view/quote-view.module')
    .then(m => m.QuoteViewModule)
},
{
  path: ':date/:payoutTo',
  component: ReportDetailComponent
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ACHReportRoutingModule { }
