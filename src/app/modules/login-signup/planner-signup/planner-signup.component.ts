import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoginSignupService } from '../services/login-signup.service';
import { FormGroup } from '@angular/forms';
import { Messages } from '@app/config/messages';
import { Constants } from '@app/config/constant';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISocialUser } from '@app/models/ISocialUser';
import { updateSignupForm } from '@app/core/utils/form.util';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from '@app/core/services/loader.service';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { PlannerPendingEmailComponent } from '../planner-pending-email/planner-pending-email.component';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { changeQueryParams } from '@app/core/utils/common.util';

@Component({
  selector: 'app-planner-signup',
  templateUrl: './planner-signup.component.html',
  styleUrls: ['./planner-signup.component.scss']
})
export class PlannerSignupComponent implements OnInit, OnDestroy {
  @Input() socialUser: ISocialUser;
  @Input() email;
  @Input() userData;
  referredBy;
  public constants = Constants;
  public plannerSignUpForm: FormGroup;
  errorMesages = Messages.ERROR;
  passwordType = Constants.passwordType;
  private readonly destroyed$ = new Subject();


  constructor(
    private readonly router: Router,
    readonly loginSignupService: LoginSignupService,
    readonly modalService: NgbModal,
    private readonly route: ActivatedRoute,
    readonly loader: LoaderService, readonly alertService: AlertService,
    private readonly sessionManagerService: SessionManagerService,
    readonly activeModal: NgbActiveModal) { }

  ngOnInit() {
    if(this.userData && this.userData.data) {
      if (this.userData.data.role !== Constants.Role.VENDOR) {
        this.referredBy = this.route.snapshot.queryParams.referredBy;
      } else {
        this.referredBy = this.userData.data.company._id;
      }
    }
    this.plannerSignUpForm = this.loginSignupService.createPlannerSignUpForm();
    this.loginSignupService.setEmailControl(this.plannerSignUpForm, this.email);
    if (this.socialUser) {
      updateSignupForm(this.plannerSignUpForm, this.socialUser);
    }
  }

  plannerSignUp() {
    const formData = { ...this.plannerSignUpForm.value };
    if (!formData.accountType) {
      delete formData.accountType;
      delete formData.token;
    }
    const payload = { ...formData, role: Constants.Role.PLANNER };
    this.loader.start();
    this.loginSignupService.plannerSignup(payload, this.referredBy).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.modalService.dismissAll();
      this.loader.stop();
      if (!res.data.user.isVerified) {
        const modalRef =
          this.modalService.open(PlannerPendingEmailComponent, { backdrop: 'static', centered: true, windowClass: 'verify-email-modal' });
        modalRef.componentInstance.email = res.data.user.email;
      } else if (res.data.user.isVerified) {
        this.sessionManagerService.createSession(res.data.token, res.data.user.role, res.data.user._id);
        this.loginSignupService.navigateuserByStatus(res.data.user);
      }
    }, error => {
      this.loader.stop();
      this.alertService.showError(error.error.message);
    });
  }

  signIn(content) {
    this.modalService.dismissAll();
    this.modalService.open(content, { centered: true, windowClass: 'login-full-modal' });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  dismiss() {
    this.modalService.dismissAll();
    this.updateQueryParams();
  }

  updateQueryParams() {
    changeQueryParams({ referredBy: null }, this.route, this.router);
  }
}
