import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { CheckRoles } from '@app/core/utils/common.util';
import { BreadCrumb } from '@app/config/breadcrumbs';
import { ActivatedRoute } from '@angular/router';
import { PlannerManagementService } from '@app/modules/admin/planner-management/services/planner-management.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.scss']
})
export class OrdersTabComponent implements OnInit, OnDestroy {
  ordersRoute = {
    purchased: Constants.APPLICATION_ROUTES.planner.purchasedOrders,
    canceled: Constants.APPLICATION_ROUTES.planner.canceledOrders
  };
  dynamicBreadcrumb = BreadCrumb.adminOrders;
  destroyed$ = new Subject();
  plannerName = '';
  isAdminPlannerOrders = false;
  plannerId;
  constructor(
    readonly checRoles: CheckRoles, private readonly route: ActivatedRoute,
    private readonly plannerManagementService: PlannerManagementService) { }
  ngOnInit() {
    this.plannerId = this.route.snapshot.params.plannerId;
    this.isAdminPlannerOrders =  this.route.snapshot.params.plannerId && this.checRoles.isAdmin();
    if (this.isAdminPlannerOrders) {
      this.plannerManagementService.getPlannerName(this.route.snapshot.params.plannerId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.plannerName = res.plannerName;
      });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
