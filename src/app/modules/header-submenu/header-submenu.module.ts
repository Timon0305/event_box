import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSubmenuComponent } from './header-submenu/header-submenu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [HeaderSubmenuComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [HeaderSubmenuComponent],
})
export class HeaderSubmenuModule { }
