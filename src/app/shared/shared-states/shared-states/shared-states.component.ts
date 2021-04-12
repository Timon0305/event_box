import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '@app/core/services/common/common.service';
import { FormGroup } from '@angular/forms';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-shared-states',
  templateUrl: './shared-states.component.html',
})
export class SharedStatesComponent implements OnInit {
  statesObservable$;
  @Input() form: FormGroup;
  @Input() selectedField: string;
  @Input() msgErrText: string;
  message = Messages.ERROR;
  constructor(
    private readonly commonService: CommonService
  ) { }

  ngOnInit() {
    this.statesObservable$ = this.commonService.getAllStates();
  }


  get isErrror() {
    return this.form.controls[this.selectedField].touched &&
      this.form.controls[this.selectedField].errors || (this.form.errors && this.form.errors[this.selectedField]);
  }

  closed() {
    this.form.controls[this.selectedField].markAsTouched();
  }


}
