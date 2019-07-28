import {Component, OnInit} from '@angular/core';
import {TemplateService} from "../../../services/frontend/template.service";
import {UserService} from "../../../services/user/user.service";
import {fadeFast, fadeMedium, fadeSlow, filterFade} from "../../../animations/animations";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        fadeFast,
        fadeMedium,
        fadeSlow
    ]

})
export class SidebarComponent implements OnInit {

    constructor(public template: TemplateService, public user: UserService) {
    }

    ngOnInit() {
    }

    public sidebarMoreClick() {
        this.template.setActiveSidebarTab('more');
        this.template.toggleShowNavigation();
    }

    public sidebarNotificationsClick() {
        this.template.setActiveSidebarTab('notifications');
        // this.template.toggleShowNotifications();
    }

    public sidebarMailClick() {
        this.template.setActiveSidebarTab('mail');
    }



}
