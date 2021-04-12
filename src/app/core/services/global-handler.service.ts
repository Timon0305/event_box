import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalHandlerService implements ErrorHandler {

  handleError(error): void {
    console.error(error);
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }
}



