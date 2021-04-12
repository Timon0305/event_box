import { Injectable } from '@angular/core';
import { Constants } from '@app/config/constant';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
isSucessShown: boolean;
isErrorShown = false;
message: string;
  constructor() { }
  showSuccess(message: string, timeOut?: number) {
    timeOut = timeOut ? timeOut : Constants.messagesTimeout;
    this.message = message;
    this.isSucessShown = true;
    setTimeout(() => {
      this.isSucessShown = false;
    }, timeOut);
}

showError(message: string, timeOut?: number) {
    timeOut = timeOut ? timeOut : Constants.messagesTimeout;
    this.message = message;
    this.isErrorShown = true;
    setTimeout(() => {
      this.isErrorShown = false;
    }, timeOut);
}
}
