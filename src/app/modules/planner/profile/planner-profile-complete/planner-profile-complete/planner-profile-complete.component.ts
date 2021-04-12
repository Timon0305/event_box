import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoaderService } from '@app/core/services/loader.service';
import { Subject } from 'rxjs/internal/Subject';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Router } from '@angular/router';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { getLogo } from '@app/core/utils/common.util';
import { filter } from 'rxjs/operators';
import { ProfileServiceService } from './services/profile-service.service';
import { Constants } from '@app/config/constant';



@Component({
  selector: 'app-planner-profile-complete',
  templateUrl: './planner-profile-complete.component.html',
  styleUrls: ['./planner-profile-complete.component.scss']
})
export class PlannerProfileCompleteComponent implements OnInit, OnDestroy {
  public f: FormGroup;
  editProfile = false;
  fileUrl = '';
  readonly destroyed$ = new Subject();

  constructor(readonly profileService: ProfileServiceService,
              readonly loader: LoaderService,
              readonly sessionService: SessionManagerService,
              readonly router: Router,
              readonly flash: AlertService) { }

  ngOnInit() {
    this.initializeForm();
    this.sessionService.getUserData().pipe(takeUntil(this.destroyed$), filter(res => !!res)).subscribe(res => {
      this.profileService.updatePlannerProfile(this.f, res);
      this.fileUrl = getLogo(res);
    });
    if (window.location.href.includes(Constants.profileType.plannerEdit)) {
      this.editProfile = true;
    }
  }

  initializeForm() {
    this.f = this.profileService.createProfileForm();

  }

  skipVendorDetails() {
    this.loader.start();
    this.profileService.skipPlannerProfile()
      .subscribe(data => {
        this.loader.stop();
        this.router.navigate(['planner/profile']);
      }, error => {
        this.loader.stop();
      }
      );
  }

  profileCreation() {
    this.loader.start();
    this.profileService.createPlannerProfile(this.f.value)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.loader.stop();
        this.sessionService.setProfileEvent(true);
        this.router.navigate(['/planner/profile']);
      }, error => {
        this.loader.stop();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


}
