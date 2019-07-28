import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Subject} from "rxjs/internal/Subject";
import {ToastService} from "../frontend/toast.service";
import {share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {



    url:string = environment.apiUrl;

    keepAliveActive:boolean = false;

    token:string = '';

    public showSpinner:boolean;
    public spinnerChange: Subject<Boolean> = new Subject<Boolean>();


    constructor(public http:HttpClient, private toast:ToastService) {
        this.showSpinner = false;
    }



    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    public call(method:string, endpoint:string, params?:any, successCallback?:any, errorCallback?:any) {
        if (endpoint != 'user-keep-alive') {
            this.showSpinner = true;
        } else {
            this.keepAliveActive = true;
        }

        this.spinnerChange.next(this.showSpinner);

        //check if keep alive is updating our token, wait for 0.5sec before sending if so
        if (endpoint != 'user-keep-alive' && this.keepAliveActive == true) {
            this.sleep(500).then(() => {
                this.makeTheCall(method, endpoint, params, successCallback, errorCallback);
            });
        } else {
            this.makeTheCall(method, endpoint, params, successCallback, errorCallback);
        }

    }

    private makeTheCall(method:string, endpoint:string, params?:any, successCallback?:any, errorCallback?:any) {

        var theCall;
        if (method == 'get') {
            theCall = this.get(endpoint, params);
        } else if (method == 'post') {
            theCall = this.post(endpoint, params);
        } else if (method == 'put') {
            theCall = this.put(endpoint, params);
        } else if (method == 'patch') {
            theCall = this.patch(endpoint, params);
        } else if (method == 'delete') {
            theCall = this.delete(endpoint, params);
        }

        const seq = theCall.pipe(share());

        seq.subscribe(
            (response: any) => {
                if (endpoint == 'user-keep-alive') {
                    this.keepAliveActive = false;
                }
                this.showSpinner = false;
                this.spinnerChange.next(this.showSpinner);
                // If the API returned a successful response
                if (response.errors == false) {
                    if (typeof successCallback == 'function') {
                        successCallback(response.data);
                    }
                } else {
                    if (typeof errorCallback == 'function') {
                        errorCallback(response.data);
                    }
                }
            },
            (response: any) => {
                if (endpoint == 'user-keep-alive') {
                    this.keepAliveActive = false;
                }
                this.showSpinner = false;
                this.spinnerChange.next(this.showSpinner);
                if (typeof errorCallback == 'function' && typeof response.error != 'undefined') {
                    errorCallback(response.error);
                }
                if (typeof response.error != 'undefined' && typeof response.error.message != 'undefined') {
                    this.toast.show(response.error.message);
                }

            }
        );

    }


    private get(endpoint:string, params?:any, reqOpts?:any) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params = reqOpts.params.append(k, params[k]);
            }
        }


        return this.http.get(this.url + '/' + endpoint, reqOpts);
    }

    private post(endpoint:string, body:any, reqOpts?:any) {

        return this.http.post(this.url + '/' + endpoint, body);
    }

    private put(endpoint:string, body:any, reqOpts?:any) {

        return this.http.put(this.url + '/' + endpoint, body);
    }

    private delete(endpoint:string, reqOpts?:any) {

        return this.http.delete(this.url + '/' + endpoint);
    }

    private patch(endpoint:string, body:any, reqOpts?:any) {

        return this.http.put(this.url + '/' + endpoint, body);
    }
}
