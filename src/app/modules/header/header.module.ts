import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoginSignupModule } from '@modules/login-signup/login-signup.module';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderSearchModule } from '../header-search/header-search.module';
import { HeaderSubmenuModule } from '../header-submenu/header-submenu.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    LoginSignupModule,
    NgbModule,
    LoginSignupModule,
    HeaderSearchModule,
    HeaderSubmenuModule
  ],
  bootstrap: [HeaderComponent],
  providers: [NgbActiveModal]
})
export class HeaderModule { }
