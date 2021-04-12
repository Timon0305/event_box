import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerSidebarComponent } from './partner-sidebar/partner-sidebar.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [{
  path: '',
  component: PartnerSidebarComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.PARTNER],
  },
  children: [
    {
      path: '',
      loadChildren: () => import('@modules/partner/partner-dashboard/partner-dashboard.module').then(m => m.PartnerDashboardModule)
    },
    {
      path: 'vendor-list',
      loadChildren: () => import('@modules/partner/partner-vendor-list/partner-vendor-list.module')
        .then(m => m.PartnerVendorListModule)
    },
    {
      path: 'planner-list',
      loadChildren: () => import('@modules/partner/partner-planner-list/partner-planner-list.module')
        .then(m => m.PartnerPlannerListModule)
    },
    {
      path: 'orders',
      loadChildren: () => import('@modules/partner/partner-orders/partner-orders.module')
        .then(m => m.PartnerOrdersModule)
    },
    {
      path: 'payment-history',
      loadChildren: () => import('@modules/ach-report/ach-report.module')
        .then(m => m.ACHReportModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
