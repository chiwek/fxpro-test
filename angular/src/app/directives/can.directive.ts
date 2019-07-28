import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import {UserService} from "../services/user/user.service";

@Directive({
    selector: '[can]'
})
export class CanDirective {

    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private user: UserService
    ) {
    }

    @Input()
    set can(val) {
        if(this.user.isAllowedAction(val)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}