import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';
import { LoaderService } from '../loader.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(
    private readonly request: RequestService, private readonly alert: AlertService,
    private readonly loader: LoaderService) { }

  export(params) {
    params = {...params, pagination: false};
    this.loader.start();
    return this.request.get(Constants.ENDPOINTS.exports, params).pipe(map(res => {
      this.loader.stop();
      this.alert.showSuccess(Messages.SUCCESS.exports);
      return res;
    }), catchError(error => {
      this.loader.stop();
      return throwError(error);
    }));
  }
}
