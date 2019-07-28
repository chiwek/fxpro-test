import {Component, OnInit} from '@angular/core';
import {TemplateService} from "../../../services/frontend/template.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    constructor(public template: TemplateService) {
    }

    ngOnInit() {
    }

    hideNav() {
        this.template.toggleShowNavigation();
    }
}
