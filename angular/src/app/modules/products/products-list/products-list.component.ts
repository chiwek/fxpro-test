import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api/api.service";
import {ModalService} from "../../../services/frontend/modal.service";
import {Client} from "../../../models/client";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../services/user/global.service";
import {ListBaseComponent} from "../../../utils/baseClasses/listBaseComponent";
import {UserService} from "../../../services/user/user.service";
import {ToastService} from "../../../services/frontend/toast.service";
import {TemplateService} from "../../../services/frontend/template.service";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends ListBaseComponent implements OnInit {

    public items: any;

    public filterData: {
        name: string,
        page: number,
        perPage: number,
        order: any,
        sort: any,
        isActive: string,

    } = {
        name: '',
        email: '',
        page: 1,
        perPage: 20,
        order: ['products.name'],
        sort: ['asc'],
        isActive: '',
    };

    public filterOpen = false;

    constructor(public template: TemplateService,  public route: ActivatedRoute, public router: Router, public modal: ModalService,
                private api: ApiService, private toast: ToastService, private globals: GlobalService, public user: UserService) {
        super(template, route, router, user, modal, 'products');
    }



    showUser(id) {
        this.router.navigate(['products/view'], {queryParams: {id: id}});

    }

    ngOnInit() {
        super.ngOnInit();
    }

    public idChanged(params) {
        this.loadItems();
    }

    public loadItems() {
        this.api.call(
            'get',
            'products/list',
            this.filterData,
            this.itemsLoaded.bind(this)
        );
    }

    private itemsLoaded(data) {
        this.items = [];

        for (const item of data.products.data) {
            this.items.push(new Product(item));
        }

        this.template.setPaging(data.products);

        if (this.activeFilter != 'default') {
            this.saveLastFilter();
        }

    }

    showForm() {
        this.router.navigate(['products/form'], {queryParams: {id: 0}});
    }

    resetFilter() {
        this.filterData.name = '';
        this.filterData.page = 1;
        this.filterData.perPage = 20;
        this.filterData.order = ['products.name'];
        this.filterData.sort = ['asc'];
        this.filterData.isActive = '';

    }

}
