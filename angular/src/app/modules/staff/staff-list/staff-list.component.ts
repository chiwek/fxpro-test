import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeFast, fadeMedium, fadeSlow, filterFade} from "../../../animations/animations";
import {ListBaseComponent} from "../../../utils/baseClasses/listBaseComponent";
import {ToastService} from "../../../services/frontend/toast.service";
import {ApiService} from "../../../services/api/api.service";
import {TemplateService} from "../../../services/frontend/template.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Staff} from "../../../models/staff";
import {GlobalService} from "../../../services/user/global.service";
import {UserService} from "../../../services/user/user.service";
import {ModalService} from "../../../services/frontend/modal.service";

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrls: ['./staff-list.component.scss'],
    animations: [
        fadeFast,
        fadeMedium,
        fadeSlow,
        filterFade
    ]

})
export class StaffListComponent extends ListBaseComponent implements OnInit {

    public items: any;

    public roles: any;


    public filterData: {
        name: string,
        email: string,
        type: string,
        page: number,
        perPage: number,
        order: any,
        sort: any,
        isActive: string,

    } = {
        name: '',
        email: '',
        type: "0",
        page: 1,
        perPage: 20,
        order: ['users.firstname'],
        sort: ['asc'],
        isActive: '',
    };

    public filterOpen = false;

    constructor(public template: TemplateService,  public route: ActivatedRoute, public router: Router, public modal: ModalService,
                private api: ApiService, private toast: ToastService, private globals: GlobalService, public user: UserService) {
        super(template, route, router, user, modal, 'staff');
    }



    showUser(id) {
        this.router.navigate(['staff/view'], {queryParams: {id: id}});

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
            'users/list',
            this.filterData,
            this.itemsLoaded.bind(this)
        );
    }

    private itemsLoaded(data) {
        this.items = [];

        for (const item of data.users.data) {
            this.items.push(new Staff(item));
        }

        this.template.setPaging(data.users);

        this.roles  = this.globals.lists.roles;


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
                    'users/delete',
                    {id:id},
                    this.loadItems.bind(this)
                );
            },
            null
        );
    }

    showForm() {
        this.router.navigate(['staff/form'], {queryParams: {id: 0}});
    }

    resetFilter() {
        this.filterData.name = '';
        this.filterData.email = '';
        this.filterData.type = "0";
        this.filterData.page = 1;
        this.filterData.perPage = 20;
        this.filterData.order = ['users.firstname'];
        this.filterData.sort = ['asc'];
        this.filterData.isActive = '';

    }


}
