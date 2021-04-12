import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VendorSignupComponent } from '../vendor-signup/vendor-signup.component';
import { PlannerSignupComponent } from '../planner-signup/planner-signup.component';
import { changeQueryParams } from '@app/core/utils/common.util';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '@app/core/validators/custom-validator';
import { Constants } from '@app/config/constant';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { LoaderService } from '@app/core/services/loader.service';

@Component({
  selector: 'app-invites-onboarding',
  templateUrl: './invites-onboarding.component.html',
  styleUrls: ['./invites-onboarding.component.scss']

})
export class InvitesOnboardingComponent implements OnInit, OnDestroy {
  @Input() referrerRole;
  email: FormControl = new FormControl('', Validators.compose([Validators.required, CustomValidator.validEmail]));
  userType: FormControl = new FormControl('', Validators.compose([Validators.required]));

  roles = Constants.Role;
  destroyed$ = new Subject();
  submit =  false;
  constructor(
    private readonly loader: LoaderService,
    private readonly requestService: RequestService, private readonly alert: AlertService,
    private readonly activatedRoute: ActivatedRoute, private readonly router: Router,
    public readonly activeModal: NgbActiveModal, private readonly modalService: NgbModal) { }

  ngOnInit() {
  }

  signup() {
    this.submit = true;
    // check if user already exist
    if (this.userType.valid) {
      this.loader.start();
      this.requestService.post<IApiSuccess>(Constants.ENDPOINTS.isUserExist, {
        email: this.email.value, role: this.userType.value,
        referredBy: this.activatedRoute.snapshot.queryParams.referredBy
      })
        .pipe(takeUntil(this.destroyed$)).subscribe((res) => {
          this.loader.stop();
          if (res.data && res.data.email === this.email.value) {
            this.alert.showError(Messages.ERROR.emailAlreadyExists);
          } else {
            this.openModal(this.userType.value === this.roles.VENDOR);
          }
        }, error => this.loader.stop());
    }

  }

  openModal(isVendor) {
    this.activeModal.close();
    const modalRef = isVendor ? this.signUpAsVendor() : this.signupAsPlanner();
    modalRef.componentInstance.email = this.email.value;
    modalRef.componentInstance.userData = this.referrerRole;
    modalRef.result.then(res => {
      this.updateQueryParams();
    }).catch(res => res);
  }

  signupAsPlanner() {
    return this.modalService.open(PlannerSignupComponent,
      { backdrop: 'static', keyboard: false, centered: true, windowClass: 'planner-signup-modal' });
  }

  signUpAsVendor() {
    return this.modalService.open(VendorSignupComponent,
      { backdrop: 'static', keyboard: false, size: 'lg', centered: true, windowClass: 'vendor-signup-modal' });
  }

  updateQueryParams() {
    changeQueryParams({ referredBy: null }, this.activatedRoute, this.router);
  }

  close() {
    this.activeModal.close();
    this.updateQueryParams();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
