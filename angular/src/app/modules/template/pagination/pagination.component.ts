import {Component, OnInit, Input} from '@angular/core';
import {TemplateService} from "../../../services/frontend/template.service";


@Component({
    selector: 'app-template-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
    @Input() paging:any;
    @Input() perPage:number;


    public opts: {
        current_page:number,
        per_page: number,
        to: number,
        from: number,
        total: number,
        last_page: number;
    } = {
        current_page: 0,
        per_page: 0,
        to: 0,
        from: 0,
        total: 0,
        last_page: 0,
    };

    public totalLinks:number = 5;

    constructor(private frontend:TemplateService) {
        frontend.updatePaging.subscribe(
            (val:any) => {
                this.opts = val;
            });

    }

    ngOnInit() {


    }

    createRange(){
        var items: number[] = [];
        if (typeof this.opts == 'undefined' ) {
            return items;
        }
        var start = this.opts.current_page;
        if (start - 2 < 1) {
            start = 1;
        } else if (start + 2 > this.opts.last_page) {
            start = this.opts.last_page + 1 - this.totalLinks
        } else {
            start = start - 2;
        }
        if (start < 1) {
            start = 1;
        }
        for(var i = 0; i < this.totalLinks; i++) {
            if (start + i > this.opts.last_page) {
                continue;
            }
            items.push(start + i);
        }
        return items;
    }

    private firstPage() {
        this.goToPage(1);
    }

    private prevPage() {
        this.goToPage(this.opts.current_page - 1);
    }

    private nextPage() {
        this.goToPage(this.opts.current_page + 1);
    }

    private lastPage() {
        this.goToPage(this.opts.last_page);
    }

    public goToPage(page) {
        this.frontend.pageChanged(page, this.opts.per_page);
    }

    changePerPage(val) {
        this.frontend.paging.per_page = val;
        this.frontend.pageChanged(1, this.frontend.paging.per_page);
    }

}
