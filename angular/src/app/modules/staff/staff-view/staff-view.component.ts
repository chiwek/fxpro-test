import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api/api.service";
import {Staff} from "../../../models/staff";

import {ToastService} from "../../../services/frontend/toast.service";
import {ModalService} from "../../../services/frontend/modal.service";

@Component({
    selector: 'app-staff-view',
    templateUrl: './staff-view.component.html',
    styleUrls: ['./staff-view.component.scss']
})
export class StaffViewComponent implements OnInit, OnDestroy {

    public id: number;

    private sub: Subscription;



    public item: Staff;



    constructor(public route: ActivatedRoute, public api: ApiService, public router: Router, public toast: ToastService, public modal: ModalService) {

    }

    ngOnInit() {

        this.sub = this.route.queryParams.subscribe(params => {
            this.id = Number(params['id']) || 0;
            this.loadItem();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    showForm(id) {
        this.router.navigate(['staff/form'], {queryParams: {id: id}});
    }

    backToList() {

        this.router.navigate(['staff/list']);
    }

    public loadItem() {
        this.api.call('get', 'users/get', {id: this.id}, this.itemLoaded.bind(this));
    }

    private itemLoaded(data) {
        this.item = new Staff(data.user);

    }



}
