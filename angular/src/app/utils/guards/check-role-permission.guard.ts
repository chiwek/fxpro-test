import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';

import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import {UserService} from "../../services/user/user.service";
import {environment} from "../../../environments/environment";
import {ModalService} from "../../services/frontend/modal.service";

@Injectable()
export class CheckRolePermissionGuard implements CanActivate {

    constructor(private user: UserService, private modal: ModalService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        const redirectUrl = route['_routerState']['url'];

        if (!this.user.loggedIn) {
            return false;
        }

        const role = this.user.userRole;
        let trimmedUrl = redirectUrl.replace(environment.baseUrl + '/', '');

        const idx = trimmedUrl.indexOf('?');
        if (idx > -1) {
            trimmedUrl = trimmedUrl.substring(0, idx);
        }

        if (trimmedUrl.substring(0, 1) === '/') {
            trimmedUrl = trimmedUrl.substring(1);
        }

        if (role.canOpenUrl(trimmedUrl)) {
            return true;
        }

        this.modal.info('You do not have permission for this action.');


        return false;
    }
}
