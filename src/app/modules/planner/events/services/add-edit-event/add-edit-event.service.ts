import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IApiSuccess } from '@app/models/IApiResponse';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { isPlanner, preparePhoneFormat } from '@app/core/utils/common.util';
import { Router } from '@angular/router';

@Injectable()
export class AddEditEventService {

  constructor(
    private readonly router: Router,
    private readonly request: RequestService, private readonly sessionService: SessionManagerService) { }

  getAllEvents() {
    return this.request.get<IApiSuccess>(Constants.ENDPOINTS.getEventTypes).pipe(map(res => res.data));
  }

  createEvent(payload) {
    payload.onSitePhone = preparePhoneFormat(payload.onSitePhone, payload.countryCode);
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.event, payload).pipe(map(res => res.data));
  }

  getAllUpcomingEvents(options?) {
    return this.request.get<IApiSuccess>(this.eventListEndpoint(), options).pipe(map(res => res.data));
  }

  getAllPastEvents(options?) {
    return this.request.get<IApiSuccess>(this.eventListEndpoint(), options).pipe(map(res => res.data));
  }

  getEventById(eventId) {
    const endPoint = isPlanner(this.sessionService.getRole()) ? Constants.ENDPOINTS.event : Constants.ENDPOINTS.adminEvents;
    return this.request.get<IApiSuccess>(`${endPoint}/${eventId}`).pipe(map(res => res));
  }

  updateEvent(payload, eventId) {
    payload.onSitePhone = preparePhoneFormat(payload.onSitePhone, payload.countryCode);
    return this.request.patch(`${Constants.ENDPOINTS.event}/${eventId}`, payload).pipe(map(res => res));
  }

  eventListEndpoint() {
    return isPlanner(this.sessionService.getRole()) ? Constants.ENDPOINTS.event : Constants.ENDPOINTS.adminEvents;
  }

  adminViewEventDetail(eventId) {
    this.router.navigate([`/admin/events/${eventId}${Constants.APPLICATION_ROUTES.planner.reltaiveQuoteRoute.awaitingQuotes}`]);
  }

  plnnerViewEventDetails(eventId, params) {
    this.router.navigate(
      [`/planner/event/event-detail/${eventId}${Constants.APPLICATION_ROUTES.planner.reltaiveQuoteRoute.awaitingQuotes}`],
      { queryParams: { ...params } });
  }

}
