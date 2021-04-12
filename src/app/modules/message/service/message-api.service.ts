import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IMessageListObject, IRecentMessageData } from '@models/IMessageListObject';
import { LoaderService } from '@app/core/services/loader.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class MessageApiService {
  activeChat = new BehaviorSubject<IMessageListObject | null>(null);
  recentChatData = new BehaviorSubject<IRecentMessageData | null>(null);

  constructor(
    private readonly request: RequestService, private readonly loader: LoaderService,
    private readonly router: Router) { }

  sendMessage(payload) {
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.message, payload).pipe(map(res => res));
  }

  getMessageList(options, isAdmin) {
    const endpoint = isAdmin ? Constants.ENDPOINTS.adminMessages : Constants.ENDPOINTS.message;
    return this.request.get<IApiSuccess>(endpoint, options).pipe(map(res => res));
  }

  getMessageById(id, options, isAdmin) {
    const endpoint = isAdmin ? Constants.ENDPOINTS.adminMessages : Constants.ENDPOINTS.message;
    return this.request.get<IApiSuccess>(`${endpoint}/${id}`, options).pipe(map(res => res));
  }

  getActiveChat() {
    return this.activeChat;
  }

  setActiveChatId(chat) {
    this.activeChat.next(chat);
  }

  setRecentMessage(data) {
    this.recentChatData.next(data);
  }

  getRecentMessage() {
    return this.recentChatData;
  }

  sendMessageAndNavigate(payload, isVendor?): Observable<IApiSuccess> {
    const route = isVendor ? Constants.APPLICATION_ROUTES.vendor.messages :
      Constants.APPLICATION_ROUTES.planner.messages;
    this.loader.start();
    return this.sendMessage(payload).pipe(map(res => {
      this.loader.stop();
      this.router.navigate([route]);
      return res;
    }), catchError(error => {
      this.loader.stop();
      return throwError(error);
    }
    ));
  }

  sendMediaMessage(payload) {
    const formData = new FormData();
    Object.keys(payload).forEach(key =>
      formData.append(key, payload[key])
    );
    return this.request.post<IApiSuccess>(Constants.ENDPOINTS.sendMediaMessage, formData, true).pipe(map(res => res));
  }
}
