import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    CanLoad,
    Route
} from '@angular/router';
import { SessionManagerService } from '../services/session/session-manager.service';
import { Messages } from '@app/config/messages';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Constants } from '@app/config/constant';
import { Location } from '@angular/common';

@Injectable()
export class RouteGuardService implements CanActivate, CanLoad {
    constructor(
        readonly alertService: AlertService,
        readonly router: Router,
        readonly sessionService: SessionManagerService,
        private readonly  loc: Location
    ) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        return this.validateUserByRole(route);
    }

    canLoad(route: Route): boolean {
        return this.validateUserByRole(route);
    }

    validateUserByRole(route) {
        const expectedRole = route.data.expectedRole;
        const role = this.sessionService.getRole();
        const token = this.sessionService.getToken();
        if (token && role && expectedRole.indexOf(role) >= 0) {
            return true;
        }
        this.sessionService.logout('', false);
        this.alertService.showError(Messages.ERROR.unAuthorized);
        if (expectedRole.indexOf(Constants.Role.ADMIN) > -1) {
            this.router.navigate(['/admin/login'], {queryParams: {redirectUri: this.loc.path()}});
        } else {
            this.router.navigate([''], {queryParams: {redirectUri: this.loc.path()}});
        }
        return false;
    }
}
