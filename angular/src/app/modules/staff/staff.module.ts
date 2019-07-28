import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffRoutingModule} from "./staff-routing.module";
import {InlineSVGModule} from "ng-inline-svg";
import {TemplateModule} from "../template/template.module";
import {SharedModule} from "../../shared.module";
import {StaffListComponent} from "./staff-list/staff-list.component";
import {StaffFormComponent} from "./staff-form/staff-form.component";

import {StaffViewComponent} from './staff-view/staff-view.component';

@NgModule({
    imports: [
        CommonModule,
        StaffRoutingModule,
        InlineSVGModule,
        SharedModule,
        TemplateModule,
    ],
    declarations: [StaffListComponent, StaffFormComponent, StaffViewComponent],
    exports: []
})
export class StaffModule {
}
