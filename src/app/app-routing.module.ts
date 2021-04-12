import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadingStrategyService } from './core/services/preloading-strategy.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'content',
    loadChildren: () => import('@shared/shared-static-pages/shared-static-pages.module').then(m => m.SharedStaticPagesModule),
    data: { preload: true, delay: false }
  },
  {
    path: 'auth', loadChildren: () => import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'vendor',
    loadChildren: () => import('@modules/vendor/vendor.module').then(m => m.VendorModule)
  },
  {
    path: 'planner',
    loadChildren: () => import('@modules/planner/planner.module').then(m => m.PlannerModule)
  },
  {
    path: 'search',
    loadChildren: () => import('@modules/search/search.module').then(m => m.SearchModule),
    data: { preload: true, delay: false }
  },
  {
    path: 'details/:id',
    loadChildren: () => import('@modules/details/details.module').then(m => m.DetailsModule),
    data: { preload: true, delay: false }
  },
  {
    path: 'admin',
    loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'partner',
    loadChildren: () => import('@modules/partner/partner/partner.module').then(m => m.PartnerModule)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadingStrategyService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

