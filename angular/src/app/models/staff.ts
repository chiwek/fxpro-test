import {BaseModel} from "./base-model";
import {ɵbypassSanitizationTrustHtml} from "@angular/core";

export class Staff extends BaseModel {
    id: number;
    role_id: number;
    franchise_id: number;
    firstname: string;
    lastname: string;
    email: string;
    image: string;
    files: any;

    username: string;
    password: string;
    remember_token: string;
    phone: string;
    cellphone: string;
    note: string;

    date_registered: Date;
    date_activated: Date;

    is_active: boolean;

    date_login: Date;
    created_at: Date;
    updated_at: Date;

    active_alerts: any;
    franchise: any;
    role: any;

    _saveUrl:string;
    _updateUrl:string;

    constructor(fields?: any) {

        super(fields);

        this._saveUrl = 'staff/create';
        this._updateUrl = 'staff/update';
    }

    public hasActiveAlert() {
        let hasAlert = this.active_alerts != null;
        if (hasAlert) {
            hasAlert = this.active_alerts.length > 0;
        }
        return hasAlert;
    }

    public getName() {
        return this.lastname + ' ' + this.firstname;
    }

    public getRoleName() {
        return this.role.name;
    }

    public getFranchiseName() {
        return this.franchise.name;
    }

    public getImage() {
        if (!this.image) {
            return '/assets/images/einstein.jpg';
        }
        return 'http://promens.codebliss.biz/storage/' + this.image;
    }
}