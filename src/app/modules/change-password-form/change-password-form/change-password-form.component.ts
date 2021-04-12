import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { LoaderService } from '@core/services/loader.service';
import { Messages } from '@app/config/messages';
import { ChangePasswordService } from '@modules/change-password-form/services/change-password.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit, OnDestroy{
  passwordType = Constants.passwordType;
  subscription: Subscription;
  constructor(
    readonly loader: LoaderService,
    readonly changePasswordService: ChangePasswordService,
    readonly alertService: AlertService,
  ) { }
  changePasswordForm: FormGroup;

  ngOnInit() {
    this.changePasswordForm = this.changePasswordService.createChangePasswordForm();
  }

  get f() {
    return this.changePasswordForm;
  }
  changePassword() {
    this.loader.start();
    this.subscription = this.changePasswordService.changePassword(this.changePasswordForm.value)
      .pipe().subscribe(
        (res) => {
          if (res) {
            this.loader.stop();
            this.changePasswordForm.reset();
            this.alertService.showSuccess(Messages.ERROR.passwordChanged);
          }
        }, error => {
          this.loader.stop();
          this.alertService.showError(Messages.ERROR.wrongPassword);
        });
  }
  ngOnDestroy() {
    if(this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

}
