import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SessionManagerService } from './core/services/session/session-manager.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Event Box | Plan your events';
  destroyed$ = new Subject();

  constructor(
    private meta: Meta,
    private readonly sessionService: SessionManagerService
  ) { }

  ngOnInit() {
    let userData;
    this.sessionService.getUserData().pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      userData = res;
      if (userData.role !== 'admin') {
        this.meta.updateTag({
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        });
      } else {
        this.meta.updateTag({
          name: 'viewport',
          content: 'width=1220, initial-scale=1'
        });
      }
    });

  }


  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}


