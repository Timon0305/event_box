import { Component, OnInit } from '@angular/core';
import { SupportFormHelper } from './support.form';
import { FormGroup } from '@angular/forms';
import { SupportService } from '../services/support.service';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  providers: [SupportFormHelper, SupportService]
})
export class SupportComponent implements OnInit {
  supportForm: FormGroup;
  isRequired = Messages.ERROR.isRequired;
  constructor(
    private readonly supportFormHelper: SupportFormHelper,
    private readonly supportService: SupportService,
    private readonly loaderService: LoaderService,
    private readonly alertService: AlertService
  ) {
    this.supportForm = this.supportFormHelper.buildForm();
  }

  ngOnInit() {
  }

  get f() {
    return this.supportForm;
  }

  submitSupport() {
    if (!this.supportForm.invalid) {
      this.loaderService.start();
      this.supportService.sendSupportMessage(this.supportForm.value).subscribe(
        res => {
          this.supportForm.reset();
          this.alertService.showSuccess(Messages.SUCCESS.supportSuccess);
          this.loaderService.stop();
        },
        error => {
          this.loaderService.stop();
          this.alertService.showSuccess(Messages.ERROR.errorOccured);
        }
      );
    }
  }

}
