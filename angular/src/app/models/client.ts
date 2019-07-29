import {BaseModel} from "./base-model";
import {ɵbypassSanitizationTrustHtml} from "@angular/core";

export class Client extends BaseModel {
    id: number;
    product_id: number;

    firstname: string;
    lastname: string;
    email: string;


    phone: string;
    cellphone: string;
    note: string;

    is_active: boolean;

    created_at: Date;
    updated_at: Date;

    product: any;
    _saveUrl:string;
    _updateUrl:string;

    constructor(fields?: any) {

        super(fields);

        this._saveUrl = 'clients/create';
        this._updateUrl = 'clients/update';
    }

    public getName() {
        return this.lastname + ' ' + this.firstname;
    }

}