import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';

import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('@modules/admin/admin-login/admin-login.module').then(m => m.AdminLoginModule)
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'vendor-management',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/admin/vendor-management/vendor-management.module').then(m => m.VendorManagementModule)
      },
      {
        path: 'planner-management',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/admin/planner-management/planner-management.module').
          then(m => m.PlannerManagementModule)
      },
      {
        path: 'user-management',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () =>
          import('@app/modules/admin/admin-user-management/admin-user-management.module').then(m => m.AdminUserManagementModule)
      },
      {
        path: 'category-management',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () =>
          import('@app/modules/admin/category-management/category-management.module').then(m => m.CategoryManagementModule)
      },
      {
        path: 'promo-code-management',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () =>
          import('@app/modules/admin/promo-code-management/promo-code-management.module').then(m => m.PromoCodeManagementModule)
      },
      {
        path: 'planner-management',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () =>
          import('@app/modules/admin/planner-management/planner-management.module').then(m => m.PlannerManagementModule)
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('@app/modules/admin/report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'events',
        loadChildren: () => import('@modules/planner/events/event-listing/event-listing.module')
          .then(m => m.EventListingModule)
      },
      {
        path: 'events/:eventViewId',
        loadChildren: () => import('@modules/planner/events/event-view/event-view.module')
          .then(m => m.EventViewModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('@modules/notification/notification.module')
          .then(m => m.NotificationModule)
      },
      {
        path: 'messages',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN],
        },
        loadChildren: () => import('@modules/message/message.module')
          .then(m => m.MessageModule)
      },
      {
        path: 'payment-details',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN],
        },
        loadChildren: () => import('@modules/payment-history/payment-history.module')
          .then(m => m.PaymentHistoryModule)
      },
      {
        path: 'pending-vendors',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN],
        },
        loadChildren: () => import('@modules/admin/pending-vendors/pending-vendors.module')
          .then(m => m.PendingVendorsModule)
      },
      {
        path: 'partner-management/list',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/admin/partner-list/partner-list.module').
          then(m => m.PartnerListModule)
      },
      {
        path: 'partner/:partnerId',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/partner/partner-add-profile/partner-add-profile.module').
          then(m => m.PartnerAddProfileModule)
      },
      {
        path: 'partner',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/partner/partner-add-profile/partner-add-profile.module').
          then(m => m.PartnerAddProfileModule)
      },
      {
        path: 'partner-management/view/:partnerId',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/partner/partner-dashboard/partner-dashboard.module').
          then(m => m.PartnerDashboardModule)
      },
      {
        path: 'payment-history',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/ach-report/ach-report.module').
          then(m => m.ACHReportModule)
      },
      {
        path: 'partner-management/view/:partnerId/planner-list',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/partner/partner-planner-list/partner-planner-list.module').
          then(m => m.PartnerPlannerListModule)
      },
      {
        path: 'partner-management/view/:partnerId/vendor-list',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/partner/partner-vendor-list/partner-vendor-list.module').
          then(m => m.PartnerVendorListModule)
      },
      {
        path: 'partner-management/view/:partnerId/orders',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.ADMIN]
        },
        loadChildren: () => import('@modules/partner/partner-orders/partner-orders.module').
          then(m => m.PartnerOrdersModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
