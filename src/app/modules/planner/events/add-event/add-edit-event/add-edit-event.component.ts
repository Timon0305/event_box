import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddEditHelperService } from '../../services/add-edit-event/add-edit-helper.service';
import { updateEventLabel } from '@app/core/utils/form.util';
import { Constants } from '@app/config/constant';
import { AddEditEventService } from '../../services/add-edit-event/add-edit-event.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { IDayCalendarConfig, DatePickerComponent } from 'ng2-date-picker';
import { updateDatesForEventInIsoFormat, modifyDatePickerMinByTimezone } from '@app/core/utils/common.util';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss'],
  providers: [AddEditHelperService, AddEditHelperService]
})
export class AddEditEventComponent implements OnInit, OnDestroy {
  addEventForm: FormGroup;
  msgErrors = Messages.ERROR;
  readonly destroyed$ = new Subject();
  eventValidation = Constants.EVENT_FORM;
  eventObservable$;
  editEvent = false;
  duplicateEvent = false;
  date;
  eventDataObservable$;
  addFixedFooterClassSidebar = true;
  public dayPickerConfig = JSON.parse(JSON.stringify(Constants.DATE_PICKER_VALIDATIONS as IDayCalendarConfig));
  messageConst = Messages.VARIABLE_INFO_ERROR_TYPES;
  @ViewChild('startDate', { static: false }) startDate: DatePickerComponent;
  @ViewChild('endDate', { static: false }) endDate: DatePickerComponent;

  constructor(
    private readonly helperService: AddEditHelperService,
    private readonly addEditEventService: AddEditEventService,
    private readonly router: Router, private readonly route: ActivatedRoute,
    private readonly loader: LoaderService,
    private readonly flash: AlertService) { }

  items = [
    { id: 1, name: 'Price: Low to High' },
    { id: 2, name: 'Price: High to Low' },
    { id: 3, name: 'Newest Arrivals' },
    { id: 4, name: 'Average Planner Reviews' }
  ];
  timeZones = Constants.TIME_ZONES_LIST;
  ngOnInit() {
    this.changeConfigMin(Constants.DEFAULT_TIME_ZONE);
    this.initializeForm();
    this.getEventTypes();
    this.addEventForm.controls.eventTimezone.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.changeConfigMin(res);
      this.helperService.setCustomValidator(this.addEventForm);
    });
  }

  changeConfigMin(timezone) {
    this.dayPickerConfig = modifyDatePickerMinByTimezone({
      configObjKey: ['startDate', 'endDate'],
      dayPickerConfig: this.dayPickerConfig, timezone
    });
  }


  getEventToPatchForm() {
    const eventId = this.route.snapshot.params.eventId || this.route.snapshot.params.duplicateEventId;
    this.eventDataObservable$ = this.addEditEventService.getEventById(eventId).pipe(takeUntil(this.destroyed$));
    this.eventDataObservable$.subscribe(res => {
      if (res && res.data) {
        if (this.route.snapshot.params.duplicateEventId) {
          this.helperService.patchProductForm(this.addEventForm, res.data, Constants.EDIT_DUPLICATE.duplicate);
        } else {
          this.helperService.patchProductForm(this.addEventForm, res.data);
        }
        Object.keys(this.addEventForm.controls).forEach(key => {
          this.addEventForm.controls[key].markAsTouched();
          this.addEventForm.controls[key].updateValueAndValidity();
        });
      }
    });
  }

  getEventTypes() {
    this.eventObservable$ = this.addEditEventService.getAllEvents();
  }

  openDatePicker(selectedDate) {
    this[selectedDate].api.open();
  }

  initializeForm() {
    this.addEventForm = this.helperService.createForm();
    if (this.addEventForm && this.route.snapshot.params.eventId) {
      this.editEvent = true;
      this.getEventToPatchForm();
    } else if (this.addEventForm && this.route.snapshot.params.duplicateEventId) {
      this.duplicateEvent = true;
      this.getEventToPatchForm();
    } else {
      this.helperService.setCustomValidator(this.addEventForm);
    }
  }


  autoGenerateLabel(value) {
    updateEventLabel(this.addEventForm);
  }

  createEvent() {
    const payload = updateDatesForEventInIsoFormat({ ...this.addEventForm.value });
    this.loader.start();
    this.addEditEventService.createEvent(payload)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.flash.showSuccess(Messages.SUCCESS.eventCreated);
        this.loader.stop();
        this.navUser(res._id);
      }, error => {
        this.flash.showError(error.error.message);
        this.loader.stop();
      });
  }


  cancel() {
    this.navUser();
  }

  navUser(eventId?) {
    return this.route.snapshot.queryParams.redirectUri ?
      this.router.navigate([this.route.snapshot.queryParams.redirectUri], { queryParams: { eventId } })
      : this.router.navigate(['/planner/event/list'], { queryParams: { type: Constants.EVENT_TYPE.upcomingEvent } });
  }

  updateEvent() {
    this.loader.start();
    const payload = updateDatesForEventInIsoFormat({ ...this.addEventForm.value });
    const eventId = this.route.snapshot.params.eventId || this.route.snapshot.params.duplicateEventId;
    this.addEditEventService.updateEvent(payload, eventId)
      .pipe(takeUntil(this.destroyed$)).subscribe(res => {
        this.loader.stop();
        this.flash.showSuccess(Messages.SUCCESS.eventUpdated);
        this.navUser();
      }, error => {
        this.flash.showError(error.error.message);
        this.loader.stop();
      });

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
