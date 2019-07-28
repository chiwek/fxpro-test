import {BaseModel} from "./base-model";

export class Role extends BaseModel {
    id: number;
    name: string;

    permissions:any;

    created_at:Date;
    updated_at:Date;


    _saveUrl:string;
    _updateUrl:string;

    constructor(fields?: any) {

        super(fields);


        this._saveUrl = 'system/roles/create';
        this._updateUrl = 'system/roles/update';
    }


    canOpenUrl(url: string) {
        console.log(this.permissions);
        for (const permission of this.permissions) {
            if (!permission.url) {
                continue;
            }
            if (permission.url === url) {
                return true;
            }
        }
        return false;
    }

    canUseAction(actionName: string) {
        for (const permission of this.permissions) {
            if (permission.action === actionName) {
                return true;
            }
        }
        return false;
    }
}
