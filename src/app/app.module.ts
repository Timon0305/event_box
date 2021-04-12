import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoaderService } from '@core/services/loader.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Interceptor } from '@core/interceptors/interceptor';
import { HeroLoaderModule } from '@herodevs/hero-loader';
import { RouteGuardService } from '@core/auth-guard/route-guard';
import { AlertMessagesModule } from '@app/modules/alert-messages/alert-messages.module';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@environments/environment';
import { GlobalHandlerService } from '@services/global-handler.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    HeroLoaderModule,
    NgbModule,
    BlockUIModule.forRoot(),
    NgxPaginationModule,
    NgxUiLoaderModule.forRoot(LoaderService.ngxUiLoaderConfig),
    FormsModule,
    ReactiveFormsModule,
    AlertMessagesModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    CookieService,
    RouteGuardService,
    {provide: ErrorHandler, useClass: GlobalHandlerService}
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
