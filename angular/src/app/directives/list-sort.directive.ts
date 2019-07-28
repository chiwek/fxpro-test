import {
    Directive,
    Input,
    ElementRef,
    Renderer2,
    OnInit,
    OnDestroy
} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {TemplateService} from "../services/frontend/template.service";

@Directive({
    selector: '[list-sort]'
})
export class ListSortDirective implements OnInit, OnDestroy {

    private subscription:Subscription;

    @Input('filter') filter: any;
    @Input('name') name: any;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private frontend: TemplateService
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.frontend.filterSortChange.subscribe((filterData) => {
            this.filter = filterData;
            this.checkClasses();
        });
        this.checkClasses();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private checkClasses() {
        let index = 0;
        let isPrimary = false;
        let isSecondary = false;
        let isAsc = false;
        for (const orderItem of this.filter.order) {
            if (orderItem === this.name) {
                if (index == 0) {
                    isPrimary = true;
                } else {
                    isSecondary = true;
                }
                if (this.filter.sort[index] == 'asc') {
                    isAsc = true;
                }
                break;
            }
            index++;
        }

        this.renderer.removeClass(this.element.nativeElement, 'is-main_sorting');
        this.renderer.removeClass(this.element.nativeElement, 'is-alt_sorting');
        this.renderer.removeClass(this.element.nativeElement, 'is-ascending');

        if (isPrimary) {
            this.renderer.addClass(this.element.nativeElement, 'is-main_sorting');
        } else if (isSecondary) {
            this.renderer.addClass(this.element.nativeElement, 'is-alt_sorting');
        }

        if (isAsc) {
            this.renderer.addClass(this.element.nativeElement, 'is-ascending');
        }

    }

}