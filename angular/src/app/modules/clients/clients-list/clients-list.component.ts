import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api/api.service";
import {ModalService} from "../../../services/frontend/modal.service";
import {Staff} from "../../../models/staff";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../services/user/global.service";
import {UserService} from "../../../services/user/user.service";
import {ToastService} from "../../../services/frontend/toast.service";
import {TemplateService} from "../../../services/frontend/template.service";
import {ListBaseComponent} from "../../../utils/baseClasses/listBaseComponent";
import {Client} from "../../../models/client";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent extends ListBaseComponent implements OnInit {

    public items: any;

    public roles: any;


    public filterData: {
        name: string,
        email: string,
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
        order: ['clients.firstname'],
        sort: ['asc'],
        isActive: '',
    };

    public filterOpen = false;

    constructor(public template: TemplateService,  public route: ActivatedRoute, public router: Router, public modal: ModalService,
                private api: ApiService, private toast: ToastService, private globals: GlobalService, public user: UserService) {
        super(template, route, router, user, modal, 'clients');
    }



    showUser(id) {
        this.router.navigate(['clients/view'], {queryParams: {id: id}});

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
            'clients/list',
            this.filterData,
            this.itemsLoaded.bind(this)
        );
    }

    private itemsLoaded(data) {
        this.items = [];

        for (const item of data.clients.data) {
            this.items.push(new Client(item));
        }

        this.template.setPaging(data.clients);

        if (this.activeFilter != 'default') {
            this.saveLastFilter();
        }

    }

    deleteUser(id) {
        this.modal.confirm(
            "Are you sure?",
            () => {
                this.api.call(
                    'post',
                    'clients/delete',
                    {id:id},
                    this.loadItems.bind(this)
                );
            },
            null
        );
    }

    showForm() {
        this.router.navigate(['clients/form'], {queryParams: {id: 0}});
    }

    resetFilter() {
        this.filterData.name = '';
        this.filterData.email = '';
        this.filterData.page = 1;
        this.filterData.perPage = 20;
        this.filterData.order = ['clients.firstname'];
        this.filterData.sort = ['asc'];
        this.filterData.isActive = '';

    }

}
