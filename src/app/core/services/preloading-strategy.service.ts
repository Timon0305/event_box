import { Injectable } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { of } from 'rxjs/internal/observable/of';
import { flatMap } from 'rxjs/operators';
import { PreloadingStrategy, Route } from '@angular/router';
import { Constants } from '@app/config/constant';
@Injectable({
  providedIn: 'root'
})
export class PreloadingStrategyService implements PreloadingStrategy {
  constructor() { }
  preload(route: Route, load) {
    const loadRoute = (delay) => delay
      ? timer(Constants.CUSTOM_PRELOAD_DELAY).pipe(flatMap(_ => load()))
      : load();
    return route.data && route.data.preload
      ? loadRoute(route.data.delay)
      : of(null);
  }
}
