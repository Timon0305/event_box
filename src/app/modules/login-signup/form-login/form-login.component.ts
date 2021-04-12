import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Subject } from 'rxjs';
import { CustomValidator } from '@app/core/validators/custom-validator';
import { RequestService } from '@app/core/http/request-service';
import { Messages } from '@app/config/messages';
import { LoginSignupService } from '@app/modules/login-signup/services/login-signup.service';
import { Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Constants } from '@app/config/constant';
import { PlannerPendingEmailComponent } from '../planner-pending-email/planner-pending-email.component';


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  providers: [LoginSignupService, NgbActiveModal]
})
export class FormLoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  invalidEmail = Messages.validationMessage.emailInvalid;
  requiredEmail = Messages.validationMessage.emailRequired;
  private readonly destroyed$ = new Subject();
  notificationToken?: string;
  loginEmail: string;
  passwordShow = false;
  staySignIn = false;
  @Input()
  adminLogin = false;

  constructor(
    readonly fb: FormBuilder,
    readonly activeModal: NgbActiveModal,
    readonly requestService: RequestService,
    readonly router: Router,
    readonly loginSignupService: LoginSignupService,
    readonly modal: NgbModal,
    readonly sessionManagerService: SessionManagerService,
    readonly alertService: AlertService,
    readonly loader: LoaderService
  ) { }

  // create login form
  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        CustomValidator.validEmail
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get f() { return this.loginForm.controls; }

  //  submit login
  login() {
    this.loginEmail = this.loginForm.value.email;
    this.validateUser();
  }

  // validate the user and create coolie session
  validateUser() {
    this.loader.start();
    this.loginSignupService.login({ ...this.loginForm.value })
      .pipe(takeUntil(this.destroyed$)).subscribe(
        (res) => {
          if (res && res.data && res.data.token) {
            this.sessionManagerService.setStaySignIn(this.staySignIn);
            this.sessionManagerService.createSession(res.data.token, res.data.user.role, res.data.user._id);
            this.loginSignupService.navigateuserByStatus(res.data.user);
            this.loader.stop();
          }
        }, error => {
          if (error.error.message === 'NOT_VERIFIED_USER') {
            this.modal.dismissAll();
            const modalRef =
            this.modal.open(PlannerPendingEmailComponent, { backdrop: 'static', centered: true, windowClass: 'verify-email-modal'});
            modalRef.componentInstance.email = this.loginForm.value.email;
          }
          this.loader.stop();
          this.alertService.showError(Messages.ERROR_TYPES[error.error.message]);
        });
  }

  // password visibility condition
  showPassword() {
    this.passwordShow = !this.passwordShow;
  }

  toggleStaySignIn(event) {
    this.staySignIn = event.target.checked;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  openModal(content) {
    this.modal.dismissAll();
    this.modal.open(content, { centered: true });
  }
}
