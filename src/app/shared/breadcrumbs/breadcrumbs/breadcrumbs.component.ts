import { Component, OnDestroy, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnDestroy {
  @Input() dynamicBreadcrumb;
  breadcrumbs: Array<{ text: string, route: string }> = [];
  readonly destroyed$ = new Subject();
  constructor(readonly router: Router, readonly route: ActivatedRoute) {
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter(event => event instanceof NavigationEnd),
        map(() => this.route.snapshot),
        map(activeRoute => {
          while (activeRoute.children[0] && activeRoute.children[0].children) {
            activeRoute = activeRoute.children[0];
          }
          return activeRoute;
        })
      )
      .subscribe((lastChildRoute: ActivatedRouteSnapshot) => {
        this.breadcrumbs = lastChildRoute.data.breadcrumb || [];
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  trackByFn(index, item) {
    return item &&  item.text; // unique id corresponding to the item
  }

  navigate(breadcrumb) {
    if (breadcrumb.route) {
      this.router.navigateByUrl(breadcrumb.route);
    }
  }

}
