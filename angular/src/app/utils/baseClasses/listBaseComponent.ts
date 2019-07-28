import {OnInit, OnDestroy} from "@angular/core/core";
import {TemplateService} from "../../services/frontend/template.service";
import {Subscription} from "rxjs/internal/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {ModalService} from "../../services/frontend/modal.service";

export abstract class ListBaseComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private globalsSub: Subscription;

    public filterData: any;

    public items:any = [];

    public pageFilters: any;
    public activeFilter: string;

    public pageName: string;

    public abstract loadItems();
    public abstract resetFilter();

    protected constructor(public frontend: TemplateService, public route: ActivatedRoute, public router: Router,
                          public user:UserService, public modal: ModalService, pageName:string,  ) {

        this.pageName = pageName;
        this.frontend.show_activeNavigationTab = pageName;
        this.subscription = frontend.changePage.subscribe(
            (val: [number, number]) => {
                this.filterData.page = val[0];
                this.filterData.perPage = val[1];
                this.loadItems();
            });


    }

    ngOnInit() {

        if (this.getLastFilter()) {
            this.applyLastUsedFilter();
        } else {
            this.applyDefaultFilter();
        }

        this.pageFilters = this.user.global.getFilterForPage(this.frontend.show_activeNavigationTab);
        this.globalsSub = this.user.global.globalsUpdated.subscribe(() => {
            this.pageFilters = this.user.global.getFilterForPage(this.frontend.show_activeNavigationTab);
        })
    }


    /**
     * Call this on itemsLoaded
     */
    public saveLastFilter() {
        localStorage.setItem(this.pageName, JSON.stringify(this.filterData));
    }

    public getLastFilter() {
        let itm = localStorage.getItem(this.pageName);
        if (itm == 'undefined') {
            return null;
        }
        itm = JSON.parse(itm);

        return itm;
    }


    public sortItems(itemName, e) {
        let index = 0;
        if (e.ctrlKey) {
            index = 1;
        }
        if (index === 0 && this.filterData.order.length > 1) {
            this.filterData.order.splice(1);
            this.filterData.sort.splice(1);
        }
        if (!this.filterData.order[index]) {
            this.filterData.order.push(itemName);
            this.filterData.sort.push('asc');
        } else {
            if (this.filterData.order[index] == itemName) {
                this.filterData.sort[index] = this.filterData.sort[index] == 'asc' ? 'desc' : 'asc';
            } else {
                this.filterData.order[index] = itemName;
                this.filterData.sort[index] = 'asc';
            }
        }
        this.filterData.page = 1;
        this.frontend.filterSortChange.next(this.filterData);
        this.loadItems();
    }


    applyDefaultFilter() {
        this.resetFilter();
        this.activeFilter = 'default';
        this.loadItems();
    }

    applyLastUsedFilter() {
        const lastFilter = this.getLastFilter();
        if (lastFilter != null) {
            this.filterData = lastFilter;
            this.activeFilter = 'last_used';
            this.loadItems();
        }
    }

    applySavedFilter(name, value) {
        this.activeFilter = name;
        this.filterData = value;
        this.loadItems();
    }

    applyFilter() {
        this.activeFilter = 'last_used';
        this.filterData.page = 1;
        this.loadItems();
    }

    saveFilter() {
        this.modal.entry('Please chose a name for your filter', 'Enter Filter Name', (filterName) => {
            this.user.saveUserFilter(this.pageName, filterName, this.filterData);
        }, null);


    }

    deleteFilter(id) {
        this.user.deleteUserFilter(id);

    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.globalsSub) {
            this.globalsSub.unsubscribe();
        }
    }

}