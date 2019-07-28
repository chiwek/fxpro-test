import {Component} from '@angular/core';
import {UserService} from "./services/user/user.service";
import {ApiService} from "./services/api/api.service";
import {ToastService} from "./services/frontend/toast.service";
import {ModalService} from "./services/frontend/modal.service";
import {Router} from "@angular/router";
import {TemplateService} from './services/frontend/template.service';
import {fadeFast, fadeMedium, fadeSlow, filterFade} from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    animations: [
        fadeFast,
        fadeMedium,
        fadeSlow,
        filterFade
    ]
})
export class AppComponent {
    title = 'FxPro';

    constructor(
        public user: UserService, public api: ApiService, public toast: ToastService, public modal: ModalService,
        public template: TemplateService, private router: Router) {
        toast.hide();
        modal.hide();
    }

    closeToast() {
        this.toast.hide();
    }

    openPage(url) {
        console.log(url);
        this.router.navigateByUrl(url);
    }


}
