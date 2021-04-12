import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorSideBarComponent } from './vendor-side-bar/vendor-side-bar.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';


const routes: Routes = [
  {
    path: '',
    component: VendorSideBarComponent,
    children: [
      {
        path: 'dashboard',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR]
        },
        loadChildren: () => import('@modules/vendor/vendor-dashboard/vendor-dashboard.module').then(m => m.VendorDashboardModule)
      },
      {
        path: 'profile',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR],
        },
        loadChildren: () => import('@modules/vendor/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'sub-vendor-management',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR]
        },
        loadChildren: () => import('@app/modules/vendor/sub-vendor-management/sub-vendor-management.module').then(
          m => m.SubVendorManagementModule
        )
      },
      {
        path: 'change-password',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR]
        },
        loadChildren: () => import('@modules/change-password-form/change-password-form.module').then(m => m.ChangePasswordFormModule)
      },
      {
        path: 'vendor-support',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR]
        },
        loadChildren: () =>
          import('@modules/shared/support/support.module').then(m => m.SupportModule)
      },
      {
        path: 'products-services',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR, Constants.Role.ADMIN],
        },
        loadChildren: () => import('@modules/vendor/products-services/products-services.module').then(m => m.ProductsServicesModule)
      },
      {
        path: 'quotes',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR],
        },
        loadChildren: () => import('@modules/vendor/quotes/quotes.module')
          .then(m => m.QuotesModule)
      }, {
        path: 'orders',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR],
        },
        loadChildren: () => import('@modules/vendor/orders/orders.module')
          .then(m => m.OrdersModule)
      }, {
        path: 'invites',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR]
        },
        loadChildren: () => import('@modules/vendor/invites/invites.module')
          .then(m => m.InvitesModule)
      }, {
        path: 'payment-history',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR]
        },
        loadChildren: () => import('@modules/ach-report/ach-report.module')
          .then(m => m.ACHReportModule)
      },
      {
        path: 'messages',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR],
        },
        loadChildren: () => import('@modules/message/message.module')
          .then(m => m.MessageModule)
      },
      {
        path: 'notifications',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR],
        },
        loadChildren: () => import('@app/modules/notification/notification.module')
          .then(m => m.NotificationModule)
      },
      {
        path: 'add-credit-card',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR]
        },
        loadChildren: () => import('@modules/planner/profile/add-credit-card-details/add-credit-card-details.module')
          .then(m => m.AddCreditCardDetailsModule)
      }, {
        path: 'dashboard',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR]
        },
        loadChildren: () => import('@modules/vendor/vendor-dashboard/vendor-dashboard.module')
          .then(m => m.VendorDashboardModule)
      },
      {
        path: 'payment-history',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.VENDOR]
        },
        loadChildren: () => import('@modules/payout-reports/payout-reports.module').
          then(m => m.PayoutReportsModule)
      },
    ]
  },
  {
    path: 'terms-of-service',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR]
    },
    loadChildren: () =>
      import('@modules/vendor/terms-of-service/terms-of-service.module').then(m => m.TermsOfServiceModule)
  },
  {
    path: 'complete-profile',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.VENDOR]
    },
    loadChildren: () => import('@modules/complete-profile/complete-profile.module').then(m => m.CompleteProfileModule)
  },
  {
    path: 'sub-vendor-signup',
    loadChildren: () =>
      import('@modules/vendor/sub-vendor-signup/sub-vendor-signup.module').then(m => m.SubVendorSignupModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
