import { Injectable } from '@angular/core';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { LoaderService } from '@app/core/services/loader.service';

@Injectable()
export class InviteServiceService {

  constructor(private readonly request: RequestService,
              private readonly loader: LoaderService) { }

  getInviteAnalytics(params = {}) {
    this.loader.start();
    return this.request.get<IApiSuccess>('/reports/invites'
      , params)
      .pipe(map(res => {
        this.loader.stop();
        return res.data;
      }), catchError(error => {
        this.loader.stop();
        return throwError(error);
      }));
  }
}
