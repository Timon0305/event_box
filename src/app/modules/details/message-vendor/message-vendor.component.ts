import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessageApiService } from '@app/modules/message/service/message-api.service';
import { Constants } from '@app/config/constant';
import { Subject } from 'rxjs/internal/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailApiService } from '../services/detail-api.service';
import { LoaderService } from '@app/core/services/loader.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';

@Component({
  selector: 'app-message-vendor',
  templateUrl: './message-vendor.component.html',
  styleUrls: ['./message-vendor.component.scss'],
  providers: [MessageApiService, DetailApiService]
})
export class MessageVendorComponent implements OnInit, OnDestroy {
  message: FormControl = new FormControl('', Validators.compose([Validators.required]));
  readonly destroyed$ = new Subject();
  plannerId;
  constructor(
    private readonly messageApiService: MessageApiService,
    private readonly route: ActivatedRoute, private readonly router: Router,
    private readonly detailApiService: DetailApiService,
    private readonly loader: LoaderService,
    private readonly sessionService: SessionManagerService
  ) { }

  ngOnInit() {
    this.sessionService.getUserData().pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      this.plannerId = res._id;
    });
  }

  sendMessage() {
    if (this.detailApiService.isUserLoggedIn(this.router.url)) {
      const payload = {
        type: Constants.MESSAGE_TYPE.PRODUCT,
        message: this.message.value,
        product: this.route.snapshot.params.id,
        planner: this.plannerId
      };
      this.messageApiService.sendMessageAndNavigate(payload)
        .pipe(takeUntil(this.destroyed$))
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
