import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { Subject } from 'rxjs/internal/Subject';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Constants } from '@app/config/constant';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { filter } from 'rxjs/internal/operators/filter';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Messages } from '@app/config/messages';
@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
  providers: [VendorService]
})
export class TermsOfServiceComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  disabledSubmit = true;
  subscriptionConstant = Messages.SUBSCRIPTION_TYPES;
  user;
  currentDate = new Date();
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId) && (window.innerHeight + window.scrollY) >
     this.document.body.offsetHeight - Constants.PAGE_THRESHOLD) {
      this.disabledSubmit = false;
    }
  }
  constructor(
    @Inject(DOCUMENT) readonly document: Document,
    @Inject(PLATFORM_ID) readonly platformId: object, readonly router: Router, readonly vendorService: VendorService,
    private readonly sessionService: SessionManagerService) { }

  ngOnInit() {
    this.getUserData();
  }


  acceptTermsOfServce() {
    this.vendorService.acceptTerms({
      acceptTerms: true
    }).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.router.navigate(['vendor/complete-profile/vendor-detail']);
    });
    // navgate to complete profile profile
  }

  getUserData() {
    this.sessionService.getUserData().pipe(takeUntil(this.destroyed$), filter(res => !!res)).subscribe(res => {
      this.user = res;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
