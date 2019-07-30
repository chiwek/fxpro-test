import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FormBaseComponent} from "../../../utils/baseClasses/formBaseComponent";
import {ApiService} from "../../../services/api/api.service";
import {Client} from "../../../models/client";
import {ModalService} from "../../../services/frontend/modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../services/user/global.service";
import {ToastService} from "../../../services/frontend/toast.service";
import {Product} from "../../../models/product";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent extends FormBaseComponent implements OnInit {

    public product: Product = new Product();
    public id: number;

    private goToList = false;

    constructor(public route: ActivatedRoute, private api: ApiService, private _fb: FormBuilder, private user: UserService,
                private modal: ModalService, private toast: ToastService, private router: Router) {
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
            this.api.call('get', 'products/get', {id: this.id}, this.userLoaded.bind(this));

        } else {
            this.product = new Product();
            this.product.is_active = true;

            this.loadForm();


        }
    }

    private userLoaded(data) {


        this.product = new Product(data.product);

        this.loadForm();
    }

    public loadForm() {
        this.frm = this._fb.group({
            'id': [this.product.id],
            'name': [this.product.name, [
                Validators.required
            ]],

            'is_active': [this.product.is_active]

        });

    }


    submitForm(goToList) {
        this.goToList = goToList;
        if (this.frm.valid) {

            this.api.call(
                'post',
                'products/process-form',
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
        this.toast.show(data.product.message);
        this.user.global.loadAll();

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
        this.router.navigate(['products/view'], {queryParams: {id: this.id}});
    }

    private goBackToList() {
        this.router.navigate(['products/list']);
    }
}
