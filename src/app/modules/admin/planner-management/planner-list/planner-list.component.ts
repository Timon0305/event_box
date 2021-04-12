import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlannerManagementService } from '../services/planner-management.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { Constants } from '@app/config/constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { IModalMetaData } from '@app/models/popUpMeta';
import { SharedConfirmationPopupService } from '@shared/shared-confirmation-popup/shared-confirmation-popup.service';
import { ExportService } from '@app/core/services/common/export.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/internal/operators/map';
import { toggleCheck } from '@app/core/utils/common.util';
import { PartnerListPopupComponent } from '@app/shared/partner-list-opup/partner-list-popup/partner-list-popup.component';

@Component({
  selector: 'app-planner-list',
  templateUrl: './planner-list.component.html',
  styleUrls: ['./planner-list.component.scss']
})
export class PlannerListComponent implements OnInit, OnDestroy {
  params: Params;
  public plannerObservable$;
  sortingData = Constants.ADMIN_PLANNER_SORTING;
  blankData = Constants.BLANK_HYPHEN;
  paginationMaxSize = Constants.PAGINATION_MAX_SIZE;
  paramsLength = 0;
  destroyed$ = new Subject();
  activePlanners;
  inactivePlanners;
  checkList: Array<string> = [];
  addFixedFooterClassSidebar: boolean;
  addFixedFooterPaddingClassSidebar: boolean;

  constructor(
    private readonly plannerManagementService: PlannerManagementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly router: Router,
    private readonly modalService: NgbModal,
    private readonly flash: AlertService,
    private readonly sharedConfirmationPopupService: SharedConfirmationPopupService,
    private readonly exportService: ExportService
  ) { }

  ngOnInit() {
    this.loaderService.start();
    this.activatedRoute.queryParams.subscribe(params => {
      this.paramsLength = Object.keys(params).length;
      this.params = params;
      this.getPlannerList(params);
    });
  }

  activeInactivePlanner(event, planerId: string, status: number) {
    event.stopPropagation();
    this.sharedConfirmationPopupService.showPopup({
      title: `${status ? 'Inactivate' : 'Activate'} Planner`,
      text: `Do you want to ${status ? 'Inactivate' : 'Activate'} this planner?`,
      leftButton: 'Cancel',
      rightButton: 'Yes'
    } as IModalMetaData).result.then(res => {
      if (res) {
        this.plannerManagementService.activeInactivePlanner(planerId, status).subscribe(
          result => {
            this.loaderService.stop();
            this.flash.showSuccess(Messages.SUCCESS.adminPlannerStatus);
            this.getPlannerList(this.params);
          },
          err => {
            this.loaderService.stop();
          }
        );
      }
    });
  }

  getPlannerList(params?) {
    this.plannerObservable$ = this.plannerManagementService.getPlannerList(params).pipe(map(result => {
      this.activePlanners = result.options.active;
      this.inactivePlanners = result.options.inActive;
      return result;
    }));
  }

  pageChange(pageNumber) {
    this.params = Object.assign({}, this.params);
    this.params.page = pageNumber;
    this.plannerManagementService.redirect(this.params);
  }

  searchPlanners(keyword) {
    this.params = Object.assign({});
    this.params.filter = keyword;
    this.plannerManagementService.redirect(this.params);
  }

  sortPlanner($event) {
    this.params = { ...this.params, ...$event };
    this.plannerManagementService.redirect(this.params);
  }

  viewPlanner(id) {
    if (!id) {
      this.router.navigate([`/admin/planner-management`]);
    }
    this.router.navigate([`/admin/planner-management/view/${id}`]);
  }
  export() {
    this.exportService.export({ exportType: Constants.EXPORTS_DATA.planners })
      .pipe(takeUntil(this.destroyed$)).subscribe();
  }
  toggleCheck(event, id) {
    this.checkList = toggleCheck({ event, id, checkList: this.checkList });
    this.addFixedFooterClassSidebar = this.checkList.length > 0;
    this.addFixedFooterPaddingClassSidebar = this.checkList.length > 0;
  }

  initiateAssociationChange() {
    const modalRef = this.modalService.open(PartnerListPopupComponent, { size: 'sm', windowClass: 'partner-list-modal' });
    modalRef.componentInstance.usersIdToAssociate = this.checkList;
    modalRef.componentInstance.role = Constants.Role.PLANNER;
    modalRef.result.then(res => {
      if (res) {
        this.checkList = [];
        this.pageChange(1);
      }
    }).catch(res => res);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
