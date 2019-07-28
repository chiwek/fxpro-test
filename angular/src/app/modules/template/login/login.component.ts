import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {environment} from "../../../../environments/environment";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
    selector: 'app-template-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public error = '';

    private redirectUrl;

    private sub: Subscription;

    public showForm = true;

    account: {
        email: string;
        password: string;
        //} = {email: "admin@sbtd.com", password: "admin"};
    } = {email: "", password: ""};


    constructor(public user: UserService, private router: Router, private route: ActivatedRoute) {
        let token = localStorage.getItem('id_token');
        if (token != null && token != 'null' && token != '') {
            this.showForm = false;
            this.user.loginWithToken(this.userLoggedInRefresh.bind(this), this.userLoginTokenError.bind(this));
            //this.userLoggedInRefresh();
        }
    }

    ngOnInit() {
        if (this.user.loggedIn) {
            this.userLoggedIn();
        }

        this.sub = this.route.queryParams.subscribe(params => {
            this.redirectUrl = params['redirectUrl'] || '';
        });

        if (environment.production == false) {

        }

        this.account.email = 'chiwek@gmail.com';
        this.account.password = 'm122eme14412';
        // this.loginUser();

        this.error = '';


    }

    loginUser() {
        this.user.login(this.account, this.userLoggedIn.bind(this), this.userLoginError.bind(this));
    }

    userLoggedIn() {
        this.error = '';
        let url = this.user.getHomePath();

        this.user.clearLocalStorage();
        this.router.navigateByUrl(url);
    }

    userLoginError(msg) {
        this.error = msg;

    }

    userLoggedInRefresh() {

        if (this.redirectUrl == '') {
            this.redirectUrl = this.user.getHomePath();
        }
        console.log('redirecting to ' + this.redirectUrl);
        this.router.navigateByUrl(this.redirectUrl);

    }

    userLoginTokenError(msg) {
        this.showForm = true;
    }

}
