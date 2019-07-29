import {BaseModel} from "./base-model";
import {ɵbypassSanitizationTrustHtml} from "@angular/core";

export class Product extends BaseModel {
    id: number;

    name: string;

    is_active: boolean;

    created_at: Date;
    updated_at: Date;

    product: any;
    _saveUrl:string;
    _updateUrl:string;

    constructor(fields?: any) {

        super(fields);

        this._saveUrl = 'products/create';
        this._updateUrl = 'products/update';
    }

}
