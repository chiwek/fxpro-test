import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import {UserService} from "../services/user/user.service";

@Directive({
    selector: '[canUrl]'
})
export class CanUrlDirective {

    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private user: UserService
    ) {
    }

    @Input()
    set canUrl(val) {
        if(this.user.isAllowedUrl(val)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}