import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../../services/frontend/toast.service";

@Component({
    selector: 'app-template-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    constructor(public toast: ToastService) {

    }


    ngOnInit() {

    }

}
