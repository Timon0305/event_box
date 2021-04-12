import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { SearchService } from '@app/modules/search/services/search.service';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core/services/common/common.service';
declare var google;


@Component({
  selector: 'app-shared-google-location',
  templateUrl: './shared-google-location.component.html',
  providers: [SearchService]
})
export class SharedGoogleLocationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('googleSearchLocation', { static: true }) location: ElementRef;
  @Input() public form;
  @Input() fromSearchFilter;
  @Input() isLocationExist;
  @Input() isHomePage;
  currentLocation = { ...Constants.SET_LOCATION_PARAMETER };
  locationAddr;
  destroy$ = new Subject();
  constructor(
    private readonly commonService: CommonService,
    private readonly flash: AlertService,
    private readonly searchService: SearchService,
    private readonly sessionService: SessionManagerService,
    private readonly cd: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sessionService.getCurrentLocaton().pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!this.locationAddr) {
          this.locationAddr = res.location;
        }
        if (this.isHomePage && !res.location && !this.commonService.IsAutoLocation) {
          this.commonService.setIsAutoLocation = true;
          this.googleAutoDetectLocation();
        } else {
          this.setLocationControls(res);
        }
      });

    if (this.activatedRoute.snapshot.queryParams.location) {
      const { location, latitude, longitude } = this.activatedRoute.snapshot.queryParams;
      this.sessionService.setCurrentLocaton({ location, latitude, longitude });
    }
    if (!this.locationAddr && this.form.value.location) {
      this.locationAddr = this.form.value.location;
    }
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }
  stopSubmit(event) {
    const keyCode = event.which || event.keyCode || event.charCode;
    return (keyCode !== Constants.KEY_CODE.enter);
  }
  private getPlaceAutocomplete() {
    if (google) {
      const autocomplete = new google.maps.places.Autocomplete(this.location.nativeElement, {
        componentRestrictions: { country: 'US' }
      });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.locationAddr = place.formatted_address;
        const placeLocation = {
          location: place.formatted_address,
          latitude: place.geometry.location.lat().toFixed(Constants.LAT_LONG_PRECISION),
          longitude: place.geometry.location.lng().toFixed(Constants.LAT_LONG_PRECISION)
        };
        this.setAutoLocationAddress(placeLocation);
      });
    }
  }

  googleAutoDetectLocation() {
    if (navigator.geolocation) {
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
    } else {
      this.flash.showError(Messages.ERROR.autoDetectLoc);
    }
  }

  setCurrentLocation(results, status, position) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        this.locationAddr = results[0].formatted_address;
        const placeLocation = {
          location: results[0].formatted_address,
          latitude: position.coords.latitude.toFixed(Constants.LAT_LONG_PRECISION),
          longitude: position.coords.longitude.toFixed(Constants.LAT_LONG_PRECISION)
        };
        if (this.isHomePage) {
          this.setCurrentLocaton(placeLocation);
          return;
        }
        this.setCurrentLocaton(placeLocation);
        this.setAutoLocationAddress(placeLocation);
      } else {
        this.flash.showError(Messages.ERROR.autoDetectLoc);
      }
    } else {
      this.flash.showError(Messages.ERROR.autoDetectLoc);
    }
  }

  setCurrentLocaton(placeLocation) {
    for (const key in this.currentLocation) {
      this.currentLocation[key] = (placeLocation[key]) ? (placeLocation[key]) : null;
    }
    this.sessionService.setCurrentLocaton(this.currentLocation);
  }

  setAutoLocationAddress(placeLocation) {
    placeLocation = { ...placeLocation, ...Constants.ELASTIC_SEARCH_PAGINATION };
    this.setLocationControls(placeLocation);
    if (this.isLocationExist === false) {
      this.sessionService.setResetFilter(true);
    }
    this.cd.detectChanges();
    if (this.fromSearchFilter) {
      this.sessionService.setCurrentLocaton(placeLocation);
      this.searchService.updateQueryParameters(placeLocation);
    }
  }

  setLocationControls(placeLocation) {
    this.setFormValue(Constants.SEARCH_CONSTANTS.LOCATION, placeLocation.location);
    this.setFormValue(Constants.LOCATION_KEY.latitude, placeLocation.latitude);
    this.setFormValue(Constants.LOCATION_KEY.longitude, placeLocation.longitude);
  }

  setFormValue(key, value) {
    this.form.controls[key].setValue(value);
  }

  resetLocationAddress() {
    this.sessionService.setCurrentLocaton({});
    this.form.patchValue(Constants.RESET_LOCATION_BASED_PARAMETER);
    if (this.fromSearchFilter) {
      this.searchService.updateQueryParameters(Constants.RESET_LOCATION_BASED_PARAMETER);
    }
  }


  onInputBlur() {
    if (this.form.value.location && this.locationAddr !== this.form.value.location) {
      this.form.controls.location.setValue(this.locationAddr);
    }
    if (!this.form.value.location) {
      this.resetLocationAddress();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
