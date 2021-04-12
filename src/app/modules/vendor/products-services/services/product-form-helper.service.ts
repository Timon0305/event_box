import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { youtubeUrlValidator } from '@app/core/validators/youtube-url.validator';
import { Constants } from '@app/config/constant';
import { priceValidator } from '@app/core/validators/price.validator';

@Injectable()
export class ProductFormHelperService {

  constructor(readonly fb: FormBuilder) { }

  getProductForm() {
    return this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      type: [Constants.PRODUCT_TYPE],
      price: ['', Validators.compose([Validators.required, priceValidator])],
      description: ['', Validators.compose([Validators.required])],
      additionalDetails: ['', Validators.compose([Validators.required])],
      category: [null, Validators.compose([Validators.required])],
      subCategory: [null, Validators.compose([Validators.required])],
      images: this.fb.array([]),
      defaultImage: [''],
      videos: this.fb.array([this.getVideoControl()]),
      willTravel: [false],
      locations: this.fb.array([this.createAddressForm()]),
      removeImages: this.fb.array([])
    });
  }

  createAddressForm(location = null, miles = null, isDefault = false) {
    return this.fb.group({
      location: [location, Validators.compose([Validators.required])],
      miles: [miles, Validators.compose([Validators.required])],
      isDefault: [isDefault, Validators.compose([Validators.required])],
    });
  }

  getVideoControl(value = '') {
    return new FormControl(value, Validators.compose([youtubeUrlValidator]));
  }

  createWillTravelAddForm(location = null, isDefault = false, miles = null) {
    return this.fb.group({
      location: [{ value: location, disabled: true }],
      isDefault: [isDefault, Validators.compose([Validators.required])],
      miles: [{ value: miles, disabled: true }],
    });
  }

  getImageControl(controlValue) {
    return new FormControl(controlValue);
  }

  patchProductForm(form: FormGroup, productData) {
    form.patchValue({
      name: productData.name,
      additionalDetails: productData.additionalDetails,
      category: productData.category._id,
      subCategory: productData.subCategory._id,
      type: productData.type,
      description: productData.description,
      defaultImage: productData.defaultImage,
      price: productData.price,
      willTravel: productData.willTravel,
    });
    this.patchImageArr(form, productData);
    this.patchVideoArr(form, productData);
    if (!productData.willTravel) {
      this.patchLocationArr(form, productData);
    } else {
      const locationControlArr = (form.get('locations') as FormArray).controls as Array<FormGroup>;
      this.updateLocationArray(locationControlArr, false);
    }
  }

  getImageFormArr(form: FormGroup) {
    return form.get('images') as FormArray;
  }

  getVideoFormArr(form: FormGroup) {
    return form.get('videos') as FormArray;
  }

  getLocationFormArr(form: FormGroup) {
    return form.get('locations') as FormArray;
  }

  patchImageArr(form, productData) {
    const imageArr = this.getImageFormArr(form);
    productData.images.forEach(element => {
      imageArr.push(this.getImageControl(element));
    });
  }

  patchVideoArr(form, productData) {
    const videoArr = this.getVideoFormArr(form);
    videoArr.removeAt(0);
    productData.videos.forEach((video, index) => {
      videoArr.push(this.getVideoControl(video));
    });
  }

  patchLocationArr(form, productData) {
    const locationArr = this.getLocationFormArr(form);
    locationArr.removeAt(0);
    productData.locations.forEach(location => {
      if (location.miles) {
        locationArr.push(this.createAddressForm(location.location._id, location.miles));
      } else {
        locationArr.push(this.createWillTravelAddForm(location.location));
      }
    });
  }

  updateLocationArray(locationControlArr: Array<FormGroup>, isEnable: boolean) {
    locationControlArr.forEach(control => {
      if (isEnable) {
        this.traverseFields(control, this.enableLocationControl);
      } else {
        this.traverseFields(control, this.disableLocationControl);

      }
    });
  }

  disableLocationControl(control, locationControl) {
    control.controls[locationControl].disable();
    control.controls[locationControl].setValidators(null);
    control.controls[locationControl].updateValueAndValidity();
    control.controls[locationControl].setValue(null);
  }

  enableLocationControl(control, locationControl) {
    control.controls[locationControl].enable();
    control.controls[locationControl].setValidators(Validators.compose([Validators.required]));
    control.controls[locationControl].updateValueAndValidity();
    control.controls[locationControl].markAsTouched();
  }

  traverseFields(control, callbackMethod) {
    Constants.PRODUCT_LOCATION_CONTROLS.forEach(data => callbackMethod(control, data));
  }

}


