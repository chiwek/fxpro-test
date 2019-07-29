import { Injectable } from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ApiService} from "../api/api.service";
import {GlobalService} from "./global.service";
import {interval} from "rxjs/internal/observable/interval";
import {Role} from "../../models/role";
import {ActivatedRoute, Router} from "@angular/router";

import {Subject} from "rxjs/internal/Subject";
import {ToastService} from "../frontend/toast.service";

function getWindow (): any {
    return window;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    
    public loggedIn:boolean = false;

    private _keepAliveSubscription: Subscription;
    private _keepAliveTick: number;
    private _keepAliveTimout: number;

    private _user: any;

    public userRole: Role;

    private globalsSub: Subscription;

    constructor(private api: ApiService, public global:GlobalService, private toast: ToastService,
                private router: Router, private route: ActivatedRoute) {

        this._keepAliveTimout = 60*8;

    }

    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    login(accountInfo: any, successCallback, errorCallback = null) {
        this.api.call('post', 'authenticate', accountInfo, this._loggedIn.bind(this, [successCallback]), this._loginError.bind(this, [errorCallback]));
    }

    loginWithToken(successCallback, errorCallback) {
        this.api.call('post', 'auth-token', {token: localStorage.getItem('id_token')}, this._loggedIn.bind(this, [successCallback]), this._loginError.bind(this, [errorCallback]));
    }
    loginPartner(code: string, successCallback, errorCallback) {
        this.api.call(
            'post',
            'authenticate-partner',
            {code: code},
            this._loggedIn.bind(this, [successCallback]),
            this._loginError.bind(this, [errorCallback]));
    }
    /**
     * sends a ping to the server so we don't get logged out from there
     * @returns {Observable<T>}
     */
    keepAlive() {
        this.api.call(
            'get',
            'user-keep-alive',
            [],
            (data: any) => {
                // localStorage.setItem('id_token', data.token);
            },
            (err: any) => {
                this.logout();
            }
        );
    }

    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this._user = null;
        localStorage.setItem('id_token', null);
        this._keepAliveSubscription.unsubscribe();
        this.globalsSub.unsubscribe();
        this.loggedIn = false;

        const redirectUrl = this.route.snapshot['_routerState']['url'];

        this.router.navigateByUrl(
            this.router.createUrlTree(
                ['/'], {
                    queryParams: {
                        redirectUrl
                    }
                }
            )
        );
    }


    private _loggedIn(successCallback, data) {

        if (data.token) {
            localStorage.setItem('id_token', data.token);
            this.api.token = data.token;
        }


        this.globalsSub = this.global.globalsUpdated.subscribe((data) => {

        });

        this.global.loadAll();


        this._user = data.user;
        this.userRole = new Role(data.user.role);
        // console.log(this.userRole);
        this.loggedIn = true;

        this._initKeepAlive();

        if (successCallback.length > 0 ) {
            if (typeof successCallback[0] == 'function') {
                successCallback[0](data.link);
            }
        }

    }

    public clearLocalStorage() {
        localStorage.clear();
        localStorage.setItem('id_token', this.api.token);
    }

    public getUser() {
        return this._user;
    }
    private _loginError(errorCallback, msg) {
        console.log(msg);

        if (errorCallback.length > 0 ) {
            if (typeof errorCallback[0] == 'function') {
                errorCallback[0](msg);
            }
        }
    }
    private _initKeepAlive() {
        this._keepAliveTick = 0;
        let timer =  interval(1000);

        this._keepAliveSubscription = timer.subscribe(t => {
            this._keepAliveTick++;
            if (this._keepAliveTick == this._keepAliveTimout) {
                this._keepAliveTick = 0;
                this.global.loadAll();
                // this.keepAlive(); load globals is enough to keep session alive
            }
        });
    }



    public isAllowedAction(action: string) {
        return this.userRole.canUseAction(action);
    }

    public isAllowedUrl(url: string) {
        return this.userRole.canOpenUrl(url);
    }

    public getHomePath() {
        var url = '';
        let roleId = Number(this.userRole.id);
        if (roleId === 1 ) {
            url ='staff/list';
        } else if (roleId === 2 ) {
            url ='clients/list';
        }
        return url;
    }

    public saveUserFilter(page, name, value) {
        console.log(value);
        this.api.call('post', 'users/filter/save', {page: page, name: name, value: value}, () => { this.global.loadAll()});
    }

    public deleteUserFilter(id) {
        this.api.call('post', 'users/filter/delete', {id: id}, () => { this.global.loadAll()});
    }

}

