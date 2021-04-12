import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { trackById } from '@app/core/utils/common.util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../service/profile.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '@app/core/services/loader.service';
import { Constants } from '@app/config/constant';
import { AddLocationComponent } from '../add-locations/add-location/add-location.component';


@Component({
  selector: 'app-company-location-view',
  templateUrl: './company-location-view.component.html',
})
export class CompanyLocationViewComponent implements OnInit, OnDestroy {
  @Input() locations;
  @Output() fetchLocations = new EventEmitter();
  trackById = trackById;
  maxLocations = Constants.LOCATION_MAX_VENDOR;
  readonly destroyed$ = new Subject();

  constructor(readonly loader: LoaderService, readonly modalService: NgbModal, readonly profileService: ProfileService) { }

  ngOnInit() {
  }

  addLocationModal() {
    this.openLocationModal();
  }

  async deleteLocation(locationId, index) {
    const deleteConfirmation = await this.profileService.openConfirmationPopup(Constants.DELETE_POPUP);
    if (deleteConfirmation) {
      this.loader.start();
      this.profileService.removeLocation(locationId)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.locations.docs.splice(index, 1);
          this.loader.stop();
        }, error => {
          this.loader.stop();
        });
    }
    return;
  }

  editLocation(location) {
    const modalRef = this.openLocationModal();
    modalRef.componentInstance.location = location;
  }

  openLocationModal() {
    const modalRef = this.modalService.open(AddLocationComponent, { backdrop: 'static', keyboard: false, centered: true });
    modalRef.result.then(res => {
      if (res) {
        this.fetchLocations.emit();
      }
    });
    return modalRef;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
