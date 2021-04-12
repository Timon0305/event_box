import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RequestService } from '../http/request-service';
import { Constants } from '@app/config/constant';
import { SessionManagerService } from './session/session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessageService {

  notificationMessage = new BehaviorSubject(false);

  constructor(
    private readonly requestService: RequestService,
    private readonly sessionService: SessionManagerService,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (messaging) => {
        messaging.onMessage = messaging.onMessage.bind(messaging);
        messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
      }
    );
  }


  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(token) {
    // Update notification token
    this.requestService.patch(Constants.ENDPOINTS.updateFirebaseToken, { token }).subscribe();
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   */
  requestPermission() {
    if (!this.sessionService.getNotificationToken() && this.sessionService.getToken()) {
      this.angularFireMessaging.requestToken.subscribe(
        (token) => {
          this.sessionService.setNotificationToken(token);
          this.updateToken(token);
        },
        (err) => {
          console.error('Unable to get permission to notify.', err);
        }
      );
    }

  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        this.notificationMessage.next(true);
      });
  }

  getNotification() {
    return this.notificationMessage;
  }
}
