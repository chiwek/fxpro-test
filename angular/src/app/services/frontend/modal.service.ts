import { Injectable } from '@angular/core';
import {interval} from "rxjs/internal/observable/interval";
import {Subscription} from "rxjs/internal/Subscription";
import {Subject} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

    public modalOpened: Subject<ModalType> = new Subject<ModalType>();
    visible:boolean;

    public content:string;

    public modalVal: string;
    public modalValPlaceholder: string;

    public modalSelectVal: string;
    public modalSelectOptions: any = [];
    type: number;

    private onYes: any;
    private onNo: any;


    private _hideSubscription: Subscription;
    private _hideTick: number;
    private _hideTimout: number;

    private isAutoHide: boolean;

    constructor() {
        this.visible = false;
        this._hideTimout = 5;
    }

    public confirm(content, onYes, onNo) {
        this.content = content;
        this.type = ModalType.Confirm;
        this.visible = true;

        this.onYes = onYes;
        this.onNo = onNo;

        this.modalOpened.next(this.type);

    }

    public info(content) {
        this.content = content;
        this.type = ModalType.Info;
        this.visible = true;

        this.onYes = null;
        this.onNo = null;
        this.modalOpened.next(this.type);

    }

    public entry(content, placeholder, onYes, onNo) {
        this.content = content;
        this.type = ModalType.Entry;
        this.visible = true;
        this.modalValPlaceholder = placeholder;

        this.onYes = onYes;
        this.onNo = onNo;
        this.modalOpened.next(this.type);

    }

    public select(content, options, onYes, onNo) {
        this.content = content;
        this.type = ModalType.Select;
        this.visible = true;
        this.modalSelectOptions = options;

        this.onYes = onYes;
        this.onNo = onNo;
        this.modalOpened.next(this.type);

    }

    public infoOkPressed() {
        this.hide();
    }

    public yesPressed() {
        if (this.onYes) {
            console.log(this.modalVal);
            if (this.type == ModalType.Entry) {
                this.onYes(this.modalVal);
            } else if (this.type == ModalType.Select) {
                this.onYes(this.modalSelectVal);
            } else {
                this.onYes();
            }
            this.onYes = null;
        }
        this.hide();
    }

    public noPressed() {
        if (this.onNo) {
            this.onNo();
            this.onNo = null;
        }
        this.hide();
    }

    public show(content, type: ModalType, isAutoHide: boolean) {
        this.content = content;
        this.type = type;
        this.visible = true;
        this.modalOpened.next(this.type);


        if (isAutoHide) {
            this._hideTick = 0;
            let timer =  interval(1000);

            this._hideSubscription = timer.subscribe(() => {
                this._hideTick++;
                if (this._hideTick == this._hideTimout) {
                    this._hideTick = 0;
                    this.hide();
                }
            });
        }

    }

    public hide() {
        this.content = '';
        this.visible = false;
        this.type = null;
        if (this._hideSubscription != null) {
            this._hideSubscription.unsubscribe();
        }

    }
}

enum ModalType {
    Confirm = 1,
    Info = 2,
    Entry = 3,
    Select = 4
}