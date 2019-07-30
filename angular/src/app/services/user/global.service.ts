import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {Subject} from "rxjs/internal/Subject";
import {Staff} from "../../models/staff";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


    public lists: any; //array contining franchises, roles, etc.. for dropdowns
    public products: any;
    public roles: any;
    public filters: any; // all filters saved by the user

    public globalsUpdated: Subject<any> = new Subject();

    constructor(private api: ApiService) {


    }

    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    public loadAll() {
        this.api.call('get', 'get-globals', {}, this._loadComplete.bind(this));
    }

    private _loadComplete(data) {

        this.lists = data.lists;
        this.products = data.products;
        this.roles = data.roles;
        this.filters = data.filters;

        this.globalsUpdated.next(data);

    }

    public getFilterForPage(pageName) {
        const filters = [];
        if (!this.filters) {
            return filters;
        }
        this.filters.forEach(f => {
            if (f.page == pageName) {
                filters.push(f);
            }
        });

        return filters;

    }


}
