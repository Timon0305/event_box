import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray } from '@angular/forms';
import { ProfileService } from '../../service/profile.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '@app/core/services/loader.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  providers: [ProfileService]
})

export class AddLocationComponent implements OnInit, OnDestroy {
  @Input() location;
  @Input() vendorId;
  locationForm: FormGroup;
  readonly destroyed$ = new Subject();
  constructor(readonly loader: LoaderService, readonly activeModal: NgbActiveModal, readonly profileService: ProfileService) { }
  ngOnInit() {
  }

  submit() {
    if (this.location) {
      this.updateLocation();
    } else {
      this.addLocation();
    }
  }

  addLocation() {
    this.profileService.addLocation(this.locationForm.value.location[0])
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.loader.stop();
        this.activeModal.close(true);
      }, error => {
        this.loader.stop();
      });
  }

  updateLocation() {
    this.loader.start();
    this.profileService.updateLocation(this.vendorId, this.location._id, this.locationForm.value.location[0])
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.loader.stop();
        this.activeModal.close(true);
      }, error => {
        this.loader.stop();
      });
  }

  afterLocationInit(locationForm) {
    this.locationForm = locationForm;
    if (this.location) {
      const locationControl = this.locationForm.controls.location as FormArray;
      locationControl.patchValue([{
        landmark: this.location.landmark,
        address: this.location.address,
        city: this.location.city,
        state: this.location.state,
        zipcode: this.location.zipcode,
        latitude: this.location.geoLocation.lat,
        longitude: this.location.geoLocation.lon
      }]);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
