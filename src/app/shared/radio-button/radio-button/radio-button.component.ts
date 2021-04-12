import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit, OnDestroy {
  typeControl: FormControl = new FormControl(Constants.ALL_RADIO_OPTION);
  readonly destroyed$ = new Subject();
  @Output() radioChnage = new EventEmitter();
  @Input() radioData;
  @Input() set value(radioValue) {
    this.typeControl.setValue(radioValue);
  }
  constructor() { }
  ngOnInit() {
    this.typeControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.radioChnage.emit(value);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
