
import { Component, OnInit, OnDestroy, Output, EventEmitter, AfterContentInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { filter } from 'rxjs/internal/operators/filter';
import { Router } from '@angular/router';
import { getLogo } from '@app/core/utils/common.util';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { ProfileService } from '@app/modules/complete-profile/services/profile.service';

@Component({
  selector: 'app-vendor-profile-form',
  templateUrl: './vendor-profile-form.component.html',
  styleUrls: ['./vendor-profile-form.component.scss'],
  providers: [ProfileService]
})
export class VendorProfileFormComponent implements OnInit, OnDestroy, AfterContentInit {
  public f: FormGroup;
  readonly destroyed$ = new Subject();
  fileUrl = '';
  @Output() emitAfterProfileFormInit = new EventEmitter();
  @Input() fromAdmin = false;
  @Input() set vendorProfileData(value) {
    if (value) {
      this.updateProfileForm(value);
    }
  }
  constructor(
    readonly profileService: ProfileService,
    readonly loader: LoaderService,
    readonly sessionService: SessionManagerService,
    readonly router: Router,
    readonly flash: AlertService) { }

  ngOnInit() {
    this.initializeForm();
    if (!this.fromAdmin) {
      this.sessionService.getUserData().pipe(takeUntil(this.destroyed$), filter(res => !!res)).subscribe(res => {
        this.updateProfileForm(res);
      });
    }
  }

  initializeForm() {
    this.f = this.profileService.createVendorDetailForm();
  }


  ngAfterContentInit() {
    this.emitAfterProfileFormInit.emit(this.f);
  }

  updateProfileForm(value) {
    this.profileService.updateProfileForm(this.f, value);
    this.fileUrl = getLogo(value);
  }


  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
