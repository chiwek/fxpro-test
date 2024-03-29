import {BaseModel} from "./base-model";

export class Staff extends BaseModel {
    id: number;
    role_id: number;

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

    role: any;

    _saveUrl:string;
    _updateUrl:string;

    constructor(fields?: any) {

        super(fields);

        this._saveUrl = 'user/create';
        this._updateUrl = 'user/update';
    }



    public getName() {
        return this.lastname + ' ' + this.firstname;
    }

    public getRoleName() {
        return this.role.name;
    }
}
