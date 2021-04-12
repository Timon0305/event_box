import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartListComponent } from './shopping-cart-list/shopping-cart-list.component';
import { RouteGuardService } from '@app/core/auth-guard/route-guard';
import { Constants } from '@app/config/constant';
import { BreadCrumb } from '@app/config/breadcrumbs';


const routes: Routes = [{
  path: '',
  component: ShoppingCartListComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedRole: [Constants.Role.PLANNER],
    breadcrumb: BreadCrumb.shoppingCart
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
