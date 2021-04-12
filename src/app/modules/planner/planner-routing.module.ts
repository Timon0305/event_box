import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';
import { PlannerSidebarComponent } from './planner-sidebar/planner-sidebar.component';



const routes: Routes = [
  {
    path: 'shopping-cart',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER],
    },
    loadChildren: () => import('@app/modules/planner/shopping-cart/shopping-cart.module')
      .then(m => m.ShoppingCartModule)
  },
  {
    path: 'checkout',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER],
    },
    loadChildren: () => import('@app/modules/planner/payment/payment.module')
      .then(m => m.PaymentModule)
  },
  {
    path: '',
    component: PlannerSidebarComponent,
    children: [
      {
        path: 'profile',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@modules/planner/profile/pl-profile-view/pl-profile-view.module')
          .then(m => m.PlProfileViewModule)
      },
      {
        path: 'change-password',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER]
        },
        loadChildren: () => import('@modules/change-password-form/change-password-form.module')
          .then(m => m.ChangePasswordFormModule)
      }, {
        path: 'planner-support',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER]
        },
        loadChildren: () =>
          import('@modules/shared/support/support.module').then(m => m.SupportModule)
      }, {
        path: 'edit-profile',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER]
        },
        loadChildren: () => import('@modules/planner/profile/planner-profile-complete/planner-profile-complete.module')
          .then(m => m.PlannerProfileCompleteModule),
      }, {
        path: 'add-credit-card',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@modules/planner/profile/add-credit-card-details/add-credit-card-details.module')
          .then(m => m.AddCreditCardDetailsModule)
      }, {
        path: 'dashboard',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER]
        },
        loadChildren: () => import('@modules/planner/planner-dashboard/planner-dashboard.module').then(m => m.PlannerDashboardModule)
      }, {
        path: 'event',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@modules/planner/events/events.module')
          .then(m => m.EventsModule)
      },
      {
        path: 'quote-request-folder',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@modules/planner/quote-request-folder/quote-request-folder.module')
          .then(m => m.QuoteRequestFolderModule)
      },
      {
        path: 'quotes',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@modules/planner/quotes-section/quotes-section.module')
          .then(m => m.QuotesSectionModule)
      },
      {
        path: 'quote-request-details/:quoteId',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@app/modules/planner/quote-request-detail/quote-request-detail.module')
          .then(m => m.QuoteRequestDetailModule)
      },
      {
        path: 'order/:orderId',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@app/modules/planner/quote-request-detail/quote-request-detail.module')
          .then(m => m.QuoteRequestDetailModule)
      },
      {
        path: 'messages',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@app/modules/message/message.module')
          .then(m => m.MessageModule)
      },
      {
        path: 'notifications',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@app/modules/notification/notification.module')
          .then(m => m.NotificationModule)
      },
      {
        path: 'orders',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@app/modules/planner/orders/orders.module')
          .then(m => m.OrdersModule)
      },
      {
        path: 'favourites',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@modules/planner/favourite/favourite.module')
          .then(m => m.FavouriteModule)
      },
      {
        path: 'my-rating-review',
        canLoad: [RouteGuardService],
        data: {
          expectedRole: [Constants.Role.PLANNER],
        },
        loadChildren: () => import('@modules/planner/rating-review/rating-review.module')
          .then(m => m.RatingReviewModule)
      },
    ]
  },
  {
    path: 'complete-profile',
    canLoad: [RouteGuardService],
    data: {
      expectedRole: [Constants.Role.PLANNER]
    },
    loadChildren: () => import('@modules/planner/profile/planner-profile-complete/planner-profile-complete.module')
      .then(m => m.PlannerProfileCompleteModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerRoutingModule { }
