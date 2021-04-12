import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ProductFormHelperService } from '../../services/product-form-helper.service';
import { Constants } from '@app/config/constant';
import { Messages } from '@app/config/messages';
@Component({
  selector: 'app-add-product-service-location',
  templateUrl: './add-product-service-location.component.html',
  styleUrls: ['./add-product-service-location.component.scss'],
})
export class AddProductServiceLocationComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() vendorLocations = [];
  productType = Constants.PRODUCT_TYPE;
  validationMessage = Messages.validationMessage;
  distanceInMiles = Constants.DISTANCE_RANGE_MILES;
  constructor(readonly ref: ChangeDetectorRef, readonly formHelper: ProductFormHelperService) {
  }

  ngOnInit() {

  }
  removeLocation(i) {
    this.getFormArr.removeAt(i);
  }

  addLocation() {
    if (this.form.value.willTravel) {
      this.addWillTravelLocationFormControls();
    } else {
      this.addLocationFormControls();
    }
    this.ref.detectChanges();
  }

  get getFormArr() {
    return this.form.get('locations') as FormArray;
  }

  willTravelToggle(event) {
    const locationControlArr = (this.form.get('locations') as FormArray).controls as Array<FormGroup>;
    this.formHelper.updateLocationArray(locationControlArr, !event.target.checked);
  }

  addWillTravelLocationFormControls() {
    this.getFormArr.push(this.formHelper.createWillTravelAddForm());
  }

  addLocationFormControls() {
    this.getFormArr.push(this.formHelper.createAddressForm());
  }

  get selectedLocationsId() {
    return this.form.value.locations.map(({ location }) => location);
  }

}
