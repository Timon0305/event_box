import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Messages } from '@app/config/messages';
import { LoaderService } from '@core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { LoginSignupService } from '@app/modules/login-signup/services/login-signup.service';
import { ForgotSuccessComponent } from '@modules/auth/forgot-success/forgot-success.component';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  providers: [LoginSignupService]
})
export class ForgotPasswordComponent implements OnInit {
  @Input() isAdminLogin = false;

  errorMesages = Messages.ERROR;
  invalidEmail = Messages.validationMessage.emailInvalid;
  requiredEmail = Messages.validationMessage.emailRequired;
  constructor(
    readonly modalService: NgbModal,
    readonly loader: LoaderService,
    readonly loginSignupService: LoginSignupService,
    readonly alertService: AlertService,
  ) { }
  forgotForm: FormGroup;
  ngOnInit() {
    this.forgotForm = this.loginSignupService.createForgotForm();
  }

  get f() {
    return this.forgotForm.controls;
  }

  //  submit forgot
  forgot() {
    this.validateUser();
  }

  // validate the user
  validateUser() {
    this.loader.start();
    this.loginSignupService.forgot({ ...this.forgotForm.value })
      .pipe().subscribe(
        (res) => {
          if (res) {
            this.modalService.dismissAll();
            this.loader.stop();
            const modalRef = this.modalService.open(ForgotSuccessComponent, { backdrop: 'static', centered: true  });
            modalRef.componentInstance.user = res.data;
            modalRef.componentInstance.isAdminLogin = this.isAdminLogin;
          } else {
            this.alertService.showError(Messages.ERROR.emailNotRegisteredWithUs);
            this.loader.stop();
          }
        },
        error => {
          this.loader.stop();
          this.alertService.showError(Messages.ERROR.userNotExist);
        });
  }

  signin(content) {
    this.modalService.dismissAll();
    if (!this.isAdminLogin) {
      this.modalService.open(content, { centered: true, windowClass: 'login-full-modal' });
    }
  }
}
