import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../../services/frontend/modal.service";
import {ToastService} from "../../../services/frontend/toast.service";
import {ApiService} from "../../../services/api/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Staff} from "../../../models/staff";
import {FormBaseComponent} from "../../../utils/baseClasses/formBaseComponent";
import {GlobalService} from "../../../services/user/global.service";

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent extends FormBaseComponent implements OnInit {


    public user: Staff = new Staff();
    public id: number;
    public franchises: any;
    public roles: any;

    private goToList = false;

    constructor(public route: ActivatedRoute, private api: ApiService, private _fb: FormBuilder,
                private modal: ModalService, private toast: ToastService, private router: Router, private globals: GlobalService) {
        super(route);
        this.loadForm();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    public idChanged(params) {
        this.loadUser();
    }

    public loadUser() {
        if (this.id > 0) {
            this.api.call('get', 'user/get', {id: this.id}, this.userLoaded.bind(this));

        } else {
            this.user = new Staff();
            this.user.is_active = true;

            setTimeout( () => {
                this.user.franchise_id = this.globals.lists.franchises[0].id;
                this.user.role_id = this.globals.lists.roles[0].id;

                this.franchises = this.globals.lists.franchises;
                this.roles  = this.globals.lists.roles;

                this.loadForm();
            }, 200 );
        }
    }

    private userLoaded(data) {


        this.user = new Staff(data.user);
        this.franchises = this.globals.lists.franchises;
        this.roles  = this.globals.lists.roles;

        this.loadForm();
    }

    public loadForm() {
        this.frm = this._fb.group({
            'id': [this.user.id],
            'role': [this.user.role_id, [
                Validators.required
            ]],
            'firstname': [this.user.firstname, [
                Validators.required
            ]],
            'lastname': [this.user.lastname, [
                Validators.required
            ]],
            'username': [this.user.username, [
                Validators.required
            ]],
            'passwords': this._fb.group({
                'password': [this.user.password],
                'password_retype': [null]}),
            'phone': [this.user.phone],
            'cellphone': [this.user.cellphone],
            'email': [this.user.email, [
                Validators.required
            ]],
            'note': [this.user.note],
            'is_active': [this.user.is_active]

        });

        this.frm.get('passwords').setValidators(
            [
                this.validatePassword.bind(this),
                this.validatePasswordRequire.bind(this)

            ]
        );
    }

    validatePassword(formGroup: FormGroup) {
        let password = formGroup.controls['password'].value;
        let confpassword = formGroup.controls['password_retype'].value;

        if (password !== confpassword) {
            return {
                passwordMatch: {
                    valid: false
                }
            };
        }
        return null;
    }

    validatePasswordRequire (formGroup: FormGroup) {
        if (this.id == 0) {
            let password = formGroup.controls['password'].value;
            let confpassword = formGroup.controls['password_retype'].value;

            if (this.id == 0 && password == null || password == '') {
                return {
                    passwordRequired: {
                        valid: false
                    }
                };
            }
        }
        return null;
    }


    submitForm(goToList) {
        this.goToList = goToList;
        if (this.frm.valid) {

            this.api.call(
                'post',
                'user/process-form',
                this.frm.value,
                this.saveSuccess.bind(this),
                this.saveError.bind(this));

        } else {
            this.markFormGroupTouched(this.frm);
            return false;
        }
        return true;
    }

    saveSuccess(data) {
        this.toast.show(data.user.message);
        if (this.goToList) {
            this.goBackToList();
        } else {
            this.goBackToView();
        }

    }

    saveError(data) {
        console.error(data);
        this.modal.info(data.message);
    }

    cancelForm(id) {
        this.goBackToList();
    }

    private goBackToView() {
        this.router.navigate(['staff/view'], {queryParams: {id: this.id}});
    }
    private goBackToList() {
        this.router.navigate(['staff/list']);
    }

}
