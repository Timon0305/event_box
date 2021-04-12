import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services/common/common.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Constants } from '@app/config/constant';
import { PartnerAddProfileService } from '@app/modules/partner/partner-add-profile/services/partner-add-profile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public collapseUserManagement = true;
  public collapsePromoCodeManagement = true;
  public collapseCategoryManagement = true;
  collapsePartnerMgmt = true;
  readonly destroyed$ = new Subject();
  event;
  headerCount;
  adminRoutes = Constants.APPLICATION_ROUTES.admin;

  constructor(
    public readonly partnerService: PartnerAddProfileService,
    private readonly commonService: CommonService
  ) { }

  ngOnInit() {
    this.subscribeHeaderCount();
  }

  onActivate(event) {
    this.event = event;
  }

  onSidebar(collapseDropdown?) {
    if (!collapseDropdown) {
      this.collapseCategoryManagement = true;
      this.collapseUserManagement = true;
      this.collapsePromoCodeManagement = true;
      this.collapsePartnerMgmt = true;
    }
  }
  subscribeHeaderCount() {
    this.commonService.getHeaderCount().pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.headerCount = res;
      });
  }

  get fixedFooterClass() {
   return this.event.addFixedFooterClassSidebar || false;
  }

  get fixedFooterPadding() {
    return this.event.addFixedFooterPaddingClassSidebar || false;
  }


}
