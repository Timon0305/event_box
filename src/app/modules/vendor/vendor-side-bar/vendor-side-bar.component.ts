import { Component, OnInit, OnDestroy, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Constants } from '@app/config/constant';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { CommonService } from '@app/core/services/common/common.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
// tslint:disable-next-line:max-line-length
import { PaySetupSubscriptionFeesComponent } from '../pay-setup-subscription-fees/pay-setup-subscription-fees/pay-setup-subscription-fees.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBasicUser } from '@app/models/IUserDetails';


@Component({
  selector: 'app-vendor-side-bar',
  templateUrl: './vendor-side-bar.component.html',
  styleUrls: ['./vendor-side-bar.component.scss']
})
export class VendorSideBarComponent implements OnInit, OnDestroy {
  appRoutesVendor = Constants.APPLICATION_ROUTES.vendor;
  private readonly destroyed$ = new Subject();
  public collapseMyAccount = true;
  public collapseQuotes = true;
  public collapseMyProducts = true;
  headerCount;
  modalRef;
  badgeObj;
  fixedFooterClass = false;
  profileMenu = false;
  public previousRoutePath = '';
  subscriptionCancelled = false;
  userData;
  vendorRoutes = Constants.APPLICATION_ROUTES.vendor;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.profileMenu && !this.elementRef.nativeElement.contains(event.target)) {
      this.profileMenu = false;
    }
  }
  constructor(
    readonly sessionService: SessionManagerService, private readonly cdr: ChangeDetectorRef,
    private readonly modalService: NgbModal,
    private readonly commonService: CommonService,
    private readonly elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.sessionService.getBadges(Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.badgeObj = res;
    });
    this.sessionService.getUserData().pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.userData = res as IBasicUser;
      this.subscriptionCancelled = this.userData.company ? this.userData.company.memberPackage.subscriptionCancelled : false;
      if (this.subscriptionCancelled) {
        this.openPaymentModal();
      } else if (!this.subscriptionCancelled && this.modalRef) {
        this.modalRef.close();
      }
    });
    this.subscribeHeaderCount();
  }


  onActivate(event) {
    if (!event.paymentPage && this.subscriptionCancelled) {
      this.openPaymentModal();
    } else if (event.paymentPage && this.modalRef) {
      this.modalRef.close();
    }
    this.fixedFooterClass = event.addFixedFooterClassSidebar || false;
  }

  subscribeHeaderCount() {
    this.commonService.getHeaderCount().pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.headerCount = res;
        this.cdr.detectChanges();
      });
  }

  onProfileMenu(collapseDropdown?) {
    if(!collapseDropdown) {
      this.collapseMyAccount = true;
      this.collapseQuotes = true;
      this.collapseMyProducts = true;
    }
    this.profileMenu = !(this.profileMenu);
  }

  openPaymentModal() {
    this.modalRef = this.modalService.open(PaySetupSubscriptionFeesComponent, { backdrop: 'static', keyboard: false, centered: true });
    this.modalRef.componentInstance.forCanceledSubscription = true;
    this.modalRef.componentInstance.user = this.userData;
  }


  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
