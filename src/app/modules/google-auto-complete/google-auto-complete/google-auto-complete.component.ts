import { Component, OnInit, ElementRef, ViewChild, Input, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { filter } from 'rxjs/internal/operators/filter';
declare var google;


@Component({
  selector: 'app-google-auto-complete',
  templateUrl: './google-auto-complete.component.html',
  styleUrls: ['./google-auto-complete.component.scss']
})
export class GoogleAutoCompleteComponent implements OnInit, OnDestroy {
  @ViewChild('searchLocation', { static: true }) location: ElementRef;
  @Input() public form;
  @Input() index;
  constructor(private readonly flash: AlertService) { }
  locationAddr;
  autoDetect$ = new BehaviorSubject(false);
  destroyed$ = new Subject();
  ngOnInit() {
    this.autoDetect$
      .pipe(takeUntil(this.destroyed$), debounceTime(Constants.AUTO_DETECT_DEBOUNCE_TIME),
      filter(res => !!res))
      .subscribe(res => this.getLocationFromGoogleApi());
  }

  onSearchLocation(searchInput, event) {
    const keyCode = event.which || event.keyCode || event.charCode;
    if (searchInput && this.location.nativeElement.value) {
      const autocomplete = new google.maps.places.Autocomplete(searchInput, {
        componentRestrictions: { country: Constants.COUNTRY.US }
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.locationAddr = place.formatted_address;
        const placeLocation = {
          address: `${place.address_components[0].short_name} ${place.address_components[1].short_name}`, landmark: place.formatted_address,
          latitude: place.geometry.location.lat().toFixed(Constants.LAT_LONG_PRECISION), longitude: place.geometry.location.lng()
            .toFixed(Constants.LAT_LONG_PRECISION)
        };
        this.setLocationAddress(placeLocation);
        this.getGeocoderLocations(this.form.controls);
      });
    } else if (keyCode === Constants.KEY_CODE.delete || this.location.nativeElement.value.length === 0) {
      this.resetCompleteForm();
    }
  }

  setLocationAddress(placeLocation) {
    this.setFormValue(Constants.LOCATION_KEY.address, placeLocation.address);
    this.setFormValue(Constants.LOCATION_KEY.landmark, placeLocation.landmark);
    this.setFormValue(Constants.LOCATION_KEY.latitude, placeLocation.latitude);
    this.setFormValue(Constants.LOCATION_KEY.longitude, placeLocation.longitude);
  }

  resetCompleteForm() {
    for (const key in Constants.LOCATION_KEY) {
      if (key) {
        this.resetFormValue(key);
      }
    }
  }

  getGeocoderLocations(formControl) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: parseFloat(formControl.latitude.value), lng: parseFloat(formControl.longitude.value) };
    geocoder.geocode({ location: latlng }, (results) => {
      this.setGeoCodeLocation(results);
    });
  }


  setGeoCodeLocation(results) {
    if (results && results[0]) {
      results[0].address_components.forEach(location => {
        if (location.types.includes(Constants.LOCATION_TYPES.city)) {
          this.setFormValue(Constants.LOCATION_KEY.city, location.long_name);
        } else if (location.types.includes(Constants.LOCATION_TYPES.state)) {
          this.setFormValue(Constants.LOCATION_KEY.state, location.long_name);
        } else if (location.types.includes(Constants.LOCATION_TYPES.zipcode)) {
          this.setFormValue(Constants.LOCATION_KEY.zipcode, location.long_name);
        }
      });
    }
    (document.getElementById(`landmark${this.index}`) as HTMLElement).focus();
    (document.getElementById(`landmark${this.index}`) as HTMLElement).blur();
  }

  autoDetectLocation() {
    if (navigator.geolocation) {
      this.autoDetect$.next(true);

    } else {
      this.flash.showError(Messages.ERROR.autoDetectLoc);
    }
  }

  getLocationFromGoogleApi() {
    navigator.geolocation.getCurrentPosition((position) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      geocoder.geocode(
        { latLng: latlng }, (results, status) => {
          this.setCurrentLocation(results, status, position);
        }
      );
    }, (error) => {
      this.flash.showError(Messages.ERROR.autoDetectLoc);
    });
  }

  setCurrentLocation(results, status, position) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        this.locationAddr = results[0].formatted_address;
        const placeLocation = {
          address: results[0].formatted_address, landmark: results[0].formatted_address,
          latitude: position.coords.latitude.toFixed(Constants.LAT_LONG_PRECISION), longitude: position.coords.longitude
            .toFixed(Constants.LAT_LONG_PRECISION)
        };
        this.setLocationAddress(placeLocation);
        this.getGeocoderLocations(this.form.controls);
      } else {
        this.flash.showError(Messages.ERROR.autoDetectLoc);
      }
    } else {
      this.flash.showError(Messages.ERROR.autoDetectLoc);
    }
  }

  setFormValue(key, value) {
    this.form.controls[key].setValue(value);
  }

  resetFormValue(key) {
    this.form.controls[key].reset();
  }

  onInputBlur() {
    if (this.locationAddr !== this.form.value.landmark) {
      this.form.controls.landmark.setValue(this.locationAddr);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
