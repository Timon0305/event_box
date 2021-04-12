import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { FormGroup } from '@angular/forms';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Constants } from '@app/config/constant';
import { Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  public editProfile = false;
  public f: FormGroup;
  private readonly errorMesages = Messages.ERROR;
  readonly destroyed$ = new Subject();
  @Output() afterProfileFormInit = new EventEmitter();
  constructor(
    readonly profileService: ProfileService,
    readonly loader: LoaderService,
    readonly sessionService: SessionManagerService,
    readonly router: Router,
    readonly flash: AlertService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (window.location.href.includes(Constants.profileType.editProfile)) {
      this.editProfile = true;
    }
  }


  emitAfterProfileFormInit(event) {
    setTimeout(() => {
      this.f = event;
      this.afterProfileFormInit.emit(this.f);
    });
  }

  saveAndUpdate() {
    const { website, instagram, facebook } = this.f.value;
    if (!(website || instagram || facebook)) {
      this.flash.showError(this.errorMesages.atleastOneWebAddress);
    } else {
      this.loader.start();
      this.profileService.updateProfile(this.f.value)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.loader.stop();
          this.sessionService.setProfileEvent(true);
          this.router.navigate(['/vendor/profile']);
        }, error => {
          this.loader.stop();
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
