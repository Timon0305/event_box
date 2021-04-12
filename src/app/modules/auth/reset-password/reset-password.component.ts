import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { FormGroup } from '@angular/forms';
import { LoaderService } from '@core/services/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Messages } from '@app/config/messages';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginSignupService } from '@app/modules/login-signup/services/login-signup.service';
import { Subscription } from 'rxjs';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { LoginComponent } from '@app/modules/login-signup/login/login.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [LoginSignupService]
})

export class ResetPasswordComponent implements OnInit, OnDestroy {
  errorMesages = Messages.ERROR;
  requiredPassword = Messages.validationMessage.password;
  passwordMinlength = Messages.validationMessage.passwordMinlength;
  passwordPatternInvalid = Messages.validationMessage.passwordPatternInvalid;
  passwordType = Constants.passwordType;
  token: string;
  isAdminUser = false;
  isPartnerUser = false;
  subscription: Subscription[] = [];
  constructor(
    readonly modalService: NgbModal,
    readonly loader: LoaderService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    readonly loginSignupService: LoginSignupService,
    readonly alertService: AlertService,
  ) { }
  resetPasswordForm: FormGroup;

  ngOnInit() {
    this.subscription.push(this.route.params.subscribe((params: Params) => {
      this.token = params.token;
      this.checkTokenExpiry();
    }));
    this.subscription.push(this.route.queryParams.subscribe(queryParams => {
      this.isAdminUser = queryParams.adminUser === '1';
      this.isPartnerUser = queryParams.partner === '1';
    }));
  }

  checkTokenExpiry() {
    this.loginSignupService.checkExpiry(this.token)
      .pipe().subscribe(
        (res) => {
          if (res) {
            this.loader.stop();
            this.resetPasswordForm = this.loginSignupService.createResetPasswordForm();
          }
        }, error => {
          this.loader.stop();
          this.router.navigate(['/']);
          this.alertService.showError(Messages.ERROR.tokenExpired);
        });
  }

  get f() {
    return this.resetPasswordForm;
  }
  resetPassword() {
    this.loader.start();
    const payload = { ...this.resetPasswordForm.value, id: this.token };
    this.loginSignupService.resetPassword(payload)
      .pipe().subscribe(
        (res) => {
          if (res) {
            this.loader.stop();
            if (this.isAdminUser) {
              this.router.navigateByUrl('auth/reset/password/success?adminUser=1');
            } else {
              this.router.navigate(['auth/reset/password/success']);
            }
          }
        }, error => {
          this.loader.stop();
          this.alertService.showError(Messages.ERROR.notFoundOrAllreadyUsed);
        });
  }

  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
  }
}
