import { Component, OnInit, Output, EventEmitter, AfterContentInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit, AfterContentInit {
  locationForm: FormGroup;
  newAddress: FormArray;
  @Output() afterInit = new EventEmitter();
  @Input() addEditLocation = false;
  constructor(readonly fb: FormBuilder, readonly profileService: ProfileService) { }

  ngOnInit() {
    this.locationForm = this.fb.group({
      location: this.fb.array([this.createAddressForm()]),
    });
    this.getLocation();
  }

  getLocation() {
    if (!this.addEditLocation) {
      this.profileService.getVendorProfileLocations().subscribe(location => {
        this.patchLocation(location);
      });
    }
  }

  patchLocation(location) {
    if (location.data.docs.length) {
      location.data.docs.forEach((loc, index) => {
        if (!index) {
          this.removeLocationControl(0);
        }
        this.newAddress = this.f.get('location') as FormArray;
        this.newAddress.push(this.patchForm(loc));
      });
    }
  }

  patchForm(loc) {
    return this.fb.group({
      address: [loc.address, Validators.compose([Validators.required])],
      city: [loc.city, Validators.compose([Validators.required])],
      state: [loc.state, Validators.compose([Validators.required])],
      zipcode: [loc.zipcode, Validators.compose([Validators.required])],
      landmark: [loc.landmark, Validators.compose([Validators.required])],
      latitude: [loc.geoLocation.lat],
      longitude: [loc.geoLocation.lon]
    });
  }

  get f() {
    return this.locationForm;
  }

  createAddressForm() {
    return this.fb.group({
      address: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required, Validators.maxLength(Constants.MAX_ZIP_LENGTH)])],
      landmark: ['', Validators.compose([Validators.required])],
      latitude: [''],
      longitude: ['']
    });
  }

  removeLocationControl(index) {
    const optArr = this.f.controls.location as FormArray;
    optArr.removeAt(index);
  }

  addNewLocationControl() {
    this.newAddress = this.f.get('location') as FormArray;
    this.newAddress.push(this.createAddressForm());
  }

  ngAfterContentInit() {
    this.afterInit.emit(this.f);
  }

}
