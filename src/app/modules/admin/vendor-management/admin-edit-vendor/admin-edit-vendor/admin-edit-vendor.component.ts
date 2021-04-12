import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { VendorManagementService } from '../../services/vendor-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorProfileFormComponent } from '@app/shared/vendor-profile-form/vendor-profile-form/vendor-profile-form.component';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { Subject } from 'rxjs/internal/Subject';
import { Constants } from '@app/config/constant';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { map } from 'rxjs/internal/operators/map';
import { AcceptVendorComponent } from '../../accept-vendor/accept-vendor/accept-vendor.component';

@Component({
  selector: 'app-admin-edit-vendor',
  templateUrl: './admin-edit-vendor.component.html',
  styleUrls: ['./admin-edit-vendor.component.scss'],
  providers: [VendorManagementService]
})
export class AdminEditVendorComponent implements OnInit, OnDestroy {
  vendorProfileData$;
  @ViewChild(VendorProfileFormComponent, { static: false }) profileForm: VendorProfileFormComponent;
  @ViewChild(AcceptVendorComponent, { static: false }) acceptVendor: AcceptVendorComponent;
  minWebAddrErr = Messages.ERROR.atleastOneWebAddress;
  destroyed$ = new Subject();
  memberPackage;
  constructor(
    private readonly router: Router,
    private readonly vendorManagementService: VendorManagementService,
    private readonly activatedRoute: ActivatedRoute, private readonly alertService: AlertService) { }

  ngOnInit() {
    this.vendorProfileData$ =
      this.vendorManagementService.getVendorById(this.activatedRoute.snapshot.params.id)
        .pipe(map(res => {
          this.memberPackage = res.company.memberPackage || null;
          return res;
        }));

  }

  updateProfile() {
    const { website, instagram, facebook } = this.profileForm.f.value;
    if (!(website || instagram || facebook)) {
      this.alertService.showError(this.minWebAddrErr);
    }
    this.updateBasicProfileApi().pipe(
      takeUntil(this.destroyed$)).subscribe((results) => {
        this.navigateToView();
      });
  }

  updateBasicProfileApi() {
    return this.vendorManagementService.updateVendorDetails(this.activatedRoute.snapshot.params.id, this.profileForm.f.value);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  navigateToView() {
    this.router.navigate([Constants.APPLICATION_ROUTES.admin.vendorView, this.activatedRoute.snapshot.params.id]);
  }

}
