import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api/api.service";
import {ModalService} from "../../../services/frontend/modal.service";
import {Subscription} from "rxjs/internal/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../services/frontend/toast.service";
import {Client} from "../../../models/client";

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.scss']
})
export class ClientsViewComponent implements OnInit {

    public id: number;

    private sub: Subscription;



    public item: Client;



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
        this.router.navigate(['clients/form'], {queryParams: {id: id}});
    }

    backToList() {

        this.router.navigate(['clients/list']);
    }

    public loadItem() {
        this.api.call('get', 'clients/get', {id: this.id}, this.itemLoaded.bind(this));
    }

    private itemLoaded(data) {
        this.item = new Client(data.user);

    }

}
