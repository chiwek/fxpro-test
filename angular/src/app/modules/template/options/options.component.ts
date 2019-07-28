import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalService} from "../../../services/frontend/modal.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
    selector: 'app-template-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, OnDestroy {

    @ViewChild('modalInput') modalInput;

    private sub: Subscription;

    constructor(public modal: ModalService, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {


        if (this.modal.type == 3) {
            this.cd.detectChanges();
            this.modalInput.nativeElement.focus();
        }

    }

    ngOnDestroy() {
        /*
        if (this.sub) {
            this.sub.unsubscribe();
        }
        */
    }



}
