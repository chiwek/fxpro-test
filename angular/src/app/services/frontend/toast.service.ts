import {Injectable} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {interval} from "rxjs/internal/observable/interval";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    public visible: boolean;
    public content: string;



    private _hideSubscription: Subscription;
    private _hideTick: number;
    private _hideTimout: number;

    constructor() {
        this.visible = false;
        this._hideTimout = 5;
    }

    public isVisible() {
        return this.visible;
    }
    public show(content) {
        this.content = content;
        this.visible = true;

        this._hideTick = 0;

        let timer = interval(1000);


        this._hideSubscription = timer.subscribe(() => {
            this._hideTick++;
            if (this._hideTick == this._hideTimout) {
                this._hideTick = 0;
                this.hide();
            }
        });
    }

    public hide() {
        this.content = '';
        this.visible = false;

        if (this._hideSubscription != null) {
            this._hideSubscription.unsubscribe();
        }

    }
}
