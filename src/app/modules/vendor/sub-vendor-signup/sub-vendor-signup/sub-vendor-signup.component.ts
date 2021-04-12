import { Component, OnInit } from '@angular/core';
import { SubVendorSignupFormHelper } from './sub-vendor-signup.form';
import { FormGroup } from '@angular/forms';
import { Constants } from '@app/config/constant';
import { SubVendorSignupService } from '../services/sub-vendor-signup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-sub-vendor-signup',
  templateUrl: './sub-vendor-signup.component.html',
  styleUrls: ['./sub-vendor-signup.component.scss'],
  providers: [SubVendorSignupFormHelper, SubVendorSignupService]
})
export class SubVendorSignupComponent implements OnInit {
  subVendorSignupForm: FormGroup;
  maxLength = Constants.signupForm.maxLength;
  passwordType = Constants.passwordType;
  vendorId: string;
  constructor(
    private readonly subVendorSignupFormHelper: SubVendorSignupFormHelper,
    private readonly subVendorSignupService: SubVendorSignupService,
    private readonly route: ActivatedRoute, private readonly router: Router,
    private readonly flash: AlertService
  ) {
    this.subVendorSignupForm = this.subVendorSignupFormHelper.buildForm();
  }

  ngOnInit() {
    this.vendorId = this.route.snapshot.queryParamMap.get('token') || '';
    this.subVendorSignupService.checkVendorStatus(this.vendorId).subscribe(res => {
      if (res.statusCode === Constants.ERROR_CODES.ENTITY_NOT_FOUND) {
        this.flash.showError(Messages.ERROR.invalidEntityId);
        this.router.navigateByUrl('/');
      } else if (res.data.isVerified) {
        this.flash.showError(Messages.ERROR.subVendorAlreadyActive);
        this.router.navigateByUrl('/');
      }
    });
  }

  get f() {
    return this.subVendorSignupForm;
  }

  subVendorSignup() {
    if (this.subVendorSignupForm.valid) {
      this.subVendorSignupService.subVendorSignUp(this.vendorId, this.subVendorSignupForm.value).subscribe(
        _ => {
          this.flash.showSuccess(Messages.SUCCESS.subVendorRegisterationComplete);
          this.router.navigateByUrl('/');
        }
      );
    }
  }

}
