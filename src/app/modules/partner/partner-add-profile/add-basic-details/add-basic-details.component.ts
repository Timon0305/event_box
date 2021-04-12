import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PartnerAddProfileService } from '../services/partner-add-profile.service';
import { Constants } from '@app/config/constant';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-add-basic-details',
  templateUrl: './add-basic-details.component.html',
  styleUrls: ['./add-basic-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBasicDetailsComponent implements OnInit, OnDestroy {
  activeTab = Constants.PARTNER_ADD_PROFILE_TAB.basicDetails;
  basicDetailsForm: FormGroup;
  destroyed$ = new Subject();
  constructor(
    public readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly addProfileService: PartnerAddProfileService) { }

  ngOnInit() {
    this.basicDetailsForm = this.addProfileService.getBasicDetailsForm();
    this.addProfileService.getPartnerDetails().pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.addProfileService.patchBasicDetails(this.basicDetailsForm, res);
    });
  }

  submitForm() {
    if (this.activatedRoute.snapshot.params.partnerId) {
      this.addProfileService.updateBasicDetails({...this.basicDetailsForm.value}, this.activatedRoute.snapshot.params.partnerId)
        .pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.navigateToNext(res._id);
        });
    } else {
      this.addProfileService.addPartner({...this.basicDetailsForm.value})
        .pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
          this.navigateToNext(res._id);
        });
    }

  }

  navigateToNext(partnerId) {
    this.router.navigate(['./commission-details', partnerId],
      { relativeTo: this.activatedRoute, queryParams: {edit: this.activatedRoute.snapshot.queryParams.add || null} });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
