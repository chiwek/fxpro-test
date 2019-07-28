import {Injectable} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor() {
    }

    // -------------------------------------------------------------------------------------------------------------------
    // Mare :)

    public show_navigation = false;
    public show_notifications = false;
    public show_activeSidebarTab = '';
    public show_activeNavigationTab = '';

    public globalClick() {
        // used to define outer click
        // stop propagation on click for all the element that don't participate
        // bellow connect elements that should somehow be affected by the global/outer click
        // console.log('GLOBAL CLICK');
        this.show_activeSidebarTab = '';
        this.show_navigation = false;
        this.show_notifications = false;
    }

    public globalClickPrevent(event) {
        // prevents the global click on elements affected by it, so the element doesn't close itself
        // place on elements wrapper as a click event so it "cuts" propagation before the children's click even occur
        event.stopPropagation();
    }

    public toggleShowNavigation() {
        this.show_navigation = !this.show_navigation;
        this.show_notifications = false;
    }

    public toggleShowNotifications() {
        this.show_notifications = !this.show_notifications;
        this.show_navigation = false;
    }

    public setActiveSidebarTab(tab) {

        if (tab === this.show_activeSidebarTab) {
            this.show_activeSidebarTab = '';
        }
        else {
            this.show_activeSidebarTab = tab;
        }

    }

    public setActiveNavigationTab(tab) {
        this.show_activeNavigationTab = tab;
    }


    // -----------------------------------------------------------------------------------------------------------------

    public filterSortChange: Subject<any> = new Subject<any>();
    public paging: any;
    public changePage: Subject<[number, number]> = new Subject();
    public updatePaging: Subject<any> = new Subject();
    public errorMsg: string;
    public successMsg: string;
    public msgIsHtml: boolean;

    public setError(msg, isHtml = false) {
        this.errorMsg = msg;
        this.msgIsHtml = isHtml;
        this.successMsg = '';
    }

    public setSuccess(msg, isHtml = false) {
        this.successMsg = msg;
        this.msgIsHtml = isHtml;
        this.errorMsg = '';
    }

    public pageChanged(page, perPage) {
        this.changePage.next([page, perPage]);
    }

    public setPaging(allData) {
        this.paging = {};
        this.paging.current_page = allData.current_page;
        this.paging.last_page = allData.last_page;
        this.paging.per_page = allData.per_page;
        this.paging.from = allData.from;
        this.paging.to = allData.to;
        this.paging.total = allData.total;
        this.updatePaging.next(this.paging);
    }

}
