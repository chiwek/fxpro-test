import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api/api.service";
import {ModalService} from "../../../services/frontend/modal.service";
import {Client} from "../../../models/client";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../services/user/global.service";
import {ToastService} from "../../../services/frontend/toast.service";
import {FormBaseComponent} from "../../../utils/baseClasses/formBaseComponent";

@Component({
    selector: 'app-clients-form',
    templateUrl: './clients-form.component.html',
    styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent extends FormBaseComponent implements OnInit {

    public client: Client = new Client();
    public id: number;

    public products: any;

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
            this.api.call('get', 'clients/get', {id: this.id}, this.userLoaded.bind(this));

        } else {
            this.client = new Client();
            this.client.is_active = true;

            this.loadForm();


        }
    }

    private userLoaded(data) {


        this.client = new Client(data.client);

        this.loadForm();
    }

    public loadForm() {
        this.frm = this._fb.group({
            'id': [this.client.id],
            'product': [this.client.product_id, [
                Validators.required
            ]],
            'firstname': [this.client.firstname, [
                Validators.required
            ]],
            'lastname': [this.client.lastname, [
                Validators.required
            ]],

            'phone': [this.client.phone],
            'cellphone': [this.client.cellphone],
            'email': [this.client.email, [
                Validators.required
            ]],
            'note': [this.client.note],
            'is_active': [this.client.is_active]

        });

    }


    submitForm(goToList) {
        this.goToList = goToList;
        if (this.frm.valid) {

            this.api.call(
                'post',
                'clients/process-form',
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
        this.toast.show(data.client.message);
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
        this.router.navigate(['clients/view'], {queryParams: {id: this.id}});
    }

    private goBackToList() {
        this.router.navigate(['clients/list']);
    }
}
