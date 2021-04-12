import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignupService } from '@app/modules/login-signup/services/login-signup.service';
import { LoaderService } from '@core/services/loader.service';
import { Messages } from '@app/config/messages';
import { AlertService } from '@app/modules/alert-messages/alert.service';

@Component({
  selector: 'app-forgot-success',
  templateUrl: './forgot-success.component.html',
  providers: [LoginSignupService]
})
export class ForgotSuccessComponent implements OnInit {
  @Input() public user;
  @Input() isAdminLogin = false;

  constructor(
    readonly modalService: NgbModal,
    readonly activeModal: NgbActiveModal,
    readonly loader: LoaderService,
    readonly loginSignupService: LoginSignupService,
    readonly alertService: AlertService
  ) { }

  ngOnInit() {
  }
  signin(content) {
    this.modalService.dismissAll();
    if (!this.isAdminLogin) {
      this.modalService.open(content, { centered: true });
    }
  }

  resendForgotMail() {
    this.loader.start();
    this.loginSignupService.forgot({ email: this.user })
      .pipe().subscribe(
        (res) => {
          if (res) {
            this.modalService.dismissAll();
            this.loader.stop();
            this.alertService.showSuccess(Messages.SUCCESS.resendEmail);
            const modalRef = this.modalService.open(ForgotSuccessComponent, { backdrop: 'static', centered: true });
            modalRef.componentInstance.user = res.data;
          }
        }, error => {
          this.loader.stop();
          this.alertService.showError(error.error.message);
        });
  }

}
