import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import {UserService} from "../../services/user/user.service";

@Injectable()
export class NeedAuthGuard implements CanActivate {

    constructor(private user: UserService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        const redirectUrl = route['_routerState']['url'];

        if (this.user.loggedIn) {
            return true;
        }

        this.router.navigateByUrl(
            this.router.createUrlTree(
                ['/'], {
                    queryParams: {
                        redirectUrl
                    }
                }
            )
        );

        return false;

    }
}