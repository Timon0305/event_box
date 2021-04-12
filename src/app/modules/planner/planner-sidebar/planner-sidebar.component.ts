import { Component, OnInit, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Constants } from '@app/config/constant';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CommonService } from '@app/core/services/common/common.service';

@Component({
  selector: 'app-planner-sidebar',
  templateUrl: './planner-sidebar.component.html',
  styleUrls: ['./planner-sidebar.component.scss']
})
export class PlannerSidebarComponent implements OnInit {
  constants =
    {
      eventType: Constants.EVENT_TYPE, plannerRoutes: Constants.APPLICATION_ROUTES.planner,
    };
  readonly destroyed$ = new Subject();
  public collapseMyAccount = true;
  public collapseOrders = true;
  public collapseMyEvents = true;
  headerCount;
  badgeObj;
  event;
  profileMenu = false;
  quoteStatus = Constants.QUOTE_STATUS;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.profileMenu  && !this.elementRef.nativeElement.contains(event.target)) {
      this.profileMenu = false;
    }
  }
  constructor(
    private readonly sessionService: SessionManagerService,
    private readonly commonService: CommonService,
    private readonly elementRef: ElementRef, private readonly cdr: ChangeDetectorRef,
    ) { }

  ngOnInit() {
    this.sessionService.getBadges(Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.badgeObj = res;
    });
    this.subscribeHeaderCount();
  }

  onActivate(event) {
    this.event = event;
  }

  get fixedFooterClass() {
    return this.event.addFixedFooterClassSidebar || false;
  }

  get fixedFooterPadding() {
    return this.event.addFixedFooterPaddingClassSidebar || false;
  }
  onProfileMenu(collapseDropdown?) {
    if(!collapseDropdown) {
      this.collapseMyAccount = true;
      this.collapseOrders = true;
      this.collapseMyEvents = true;        
    }
    this.profileMenu = !(this.profileMenu);
  }
  subscribeHeaderCount() {
    this.commonService.getHeaderCount().pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.headerCount = res;
        this.cdr.detectChanges();
      });
  }
}
