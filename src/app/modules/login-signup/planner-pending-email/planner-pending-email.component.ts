import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignupService } from '../services/login-signup.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-planner-pending-email',
  templateUrl: './planner-pending-email.component.html',
})
export class PlannerPendingEmailComponent implements OnInit, OnDestroy {
  @Input() public email;
  private readonly destroyed$ = new Subject();
  constructor(private readonly modalService: NgbModal,
              private readonly loginService: LoginSignupService,
              private readonly flash: AlertService) { }

  ngOnInit() {
  }

  backToSignIn(content) {
    this.modalService.dismissAll();
    this.modalService.open(content, { centered: true, windowClass: 'login-full-modal'  });
  }

  resendForgotMail() {
    this.loginService.resendEmail({email: this.email}).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.flash.showSuccess(Messages.SUCCESS.emailSent);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
