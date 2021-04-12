import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { environment } from '@environments/environment';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { ProfileService } from '@app/modules/complete-profile/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.scss'],
  providers: [ProfileService]
})
export class UploadLogoComponent implements OnInit, OnDestroy {
  @Input() fileUrl: string;
  @Input() fromViewProfile: boolean;
  @Input() fromAdmin;
  s3BaseUrl = environment.s3BaseUrl;
  destroyed$ = new Subject();
  constructor(
    readonly profileService: ProfileService, private readonly activatedRoute: ActivatedRoute,
    readonly loader: LoaderService, readonly sessionService: SessionManagerService, readonly flash: AlertService) { }

  ngOnInit() {
  }

  uploadProfileImage(event) {
    const reader = new FileReader();
    if (event.target.files[0].size > Constants.fileSizes.vendorProfileImgSize) {
      this.flash.showError(Messages.ERROR.invalidFileSize);
    } else if ((Constants.FILE_TYPE_ALLOW).indexOf(event.target.files[0].type) < 0) {
      this.flash.showError(Messages.validationMessage.invalidFileFormat);
    } else {
      reader.onload = (readerEvent) => {
        if (this.fromAdmin) {
          this.loader.startChildLoader('upload-loader');
          this.profileService.adminUpdateLogo(this.activatedRoute.snapshot.params.id, event.target.files[0])
            .pipe(takeUntil(this.destroyed$)).subscribe((res) => {
              this.loader.stopChildLoader('upload-loader');
              this.fileUrl = res.data.url;
            }, err => {
              this.loader.stopChildLoader('upload-loader');
              this.fileUrl = '';
            });
        } else {
          this.loader.startChildLoader('upload-loader');
          this.profileService.uploadVendorLogo(event.target.files[0])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(uploadedFile => {
              this.fileUrl = uploadedFile.data.url;
              this.loader.stopChildLoader('upload-loader');
              // file uploaded successfully
              this.sessionService.setProfileEvent(true);
            }, error => {
              this.loader.stopChildLoader('upload-loader');
              this.fileUrl = '';
            });
        }
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  updateUrl() {
    this.fileUrl = `${this.s3BaseUrl}${this.fileUrl}`;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
