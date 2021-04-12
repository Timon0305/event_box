import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationApiService } from './service/notification-api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationTimePipe } from './notification-time.pipe';
import { NotificationDateDirective } from './notification-date.directive';
import { PaginationModule } from '@app/shared/pagination/pagination.module';


@NgModule({
  declarations: [NotificationListComponent, NotificationTimePipe, NotificationDateDirective],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NgbModule,
    PaginationModule
  ],
  providers: [NotificationApiService]
})
export class NotificationModule { }
