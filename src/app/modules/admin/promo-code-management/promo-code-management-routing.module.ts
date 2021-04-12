import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromoCodeManagementListComponent } from './promo-code-management-list/promo-code-management-list.component';
import { PromoCodeSaveComponent } from './promo-code-save/promo-code-save.component';
import { BreadCrumb } from '@app/config/breadcrumbs';


const routes: Routes = [
  {
    path: '',
    component: PromoCodeManagementListComponent
  },
  {
    path: 'save', component: PromoCodeSaveComponent,
    data: {
      breadcrumb: BreadCrumb.adminPromoCodeAdd
    }
  },
  {
    path: 'save/:id', component: PromoCodeSaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoCodeManagementRoutingModule { }
