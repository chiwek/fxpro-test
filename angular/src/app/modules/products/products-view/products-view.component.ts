import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api/api.service";
import {Client} from "../../../models/client";
import {ModalService} from "../../../services/frontend/modal.service";
import {Subscription} from "rxjs/internal/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../services/frontend/toast.service";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {

    public id: number;

    private sub: Subscription;



    public item: Product;



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
        this.router.navigate(['products/form'], {queryParams: {id: id}});
    }

    backToList() {

        this.router.navigate(['products/list']);
    }

    public loadItem() {
        this.api.call('get', 'products/get', {id: this.id}, this.itemLoaded.bind(this));
    }

    private itemLoaded(data) {
        this.item = new Product(data.product);

    }
}
