import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoaderService } from '@app/core/services/loader.service';
import { ProfileService } from '../services/profile.service';
import { Subject } from 'rxjs/internal/Subject';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Router } from '@angular/router';

import { LocationFormComponent } from '../location-form/location-form.component';
import { Messages } from '@app/config/messages';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Constants } from '../../../config/constant';


@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.scss']
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();
  locationForm: FormGroup;
  errorMesages = Messages.ERROR;
  profileForm: FormGroup;
  maxLocations = Constants.LOCATION_MAX_VENDOR;
  @ViewChild(LocationFormComponent, { static: false }) locationFormComponent: LocationFormComponent;
  constructor(
    readonly sessionService: SessionManagerService,
    readonly loader: LoaderService,
    readonly profileService: ProfileService,
    readonly flash: AlertService,
    readonly router: Router) { }

  ngOnInit() {
  }

  afterInit($event) {
    this.locationForm = $event;
  }

  afterProfileFormInit($event) {
    this.profileForm = $event;
  }

  createNewLocationControl() {
    this.locationFormComponent.addNewLocationControl();
  }

  get isValid() {
    return this.profileService && this.locationForm && this.profileForm.valid && this.locationForm.valid;
  }


  updateProfile() {
    const { website, instagram, facebook } = this.profileForm.value;
    if (!(website || instagram || facebook)) {
      this.flash.showError(this.errorMesages.atleastOneWebAddress);
    }  else {
      this.loader.start();
      this.profileService.updateVendorProfile({ ...this.profileForm.value, ...this.locationForm.value })
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.loader.stop();
          this.sessionService.setProfileEvent(true);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate([`vendor/complete-profile/bank-detail`]));
        }, error => {
          this.loader.stop();
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
