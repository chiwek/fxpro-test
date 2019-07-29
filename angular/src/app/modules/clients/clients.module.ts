import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsViewComponent} from './clients-view/clients-view.component';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientsFormComponent} from './clients-form/clients-form.component';
import {InlineSVGModule} from "ng-inline-svg";
import {SharedModule} from "../../shared.module";
import {TemplateModule} from "../template/template.module";
import {ClientsRoutingModule} from "./clients-routing.module";

@NgModule({

    imports: [
        CommonModule,
        ClientsRoutingModule,
        InlineSVGModule,
        SharedModule,
        TemplateModule,
    ],
    declarations: [ClientsViewComponent, ClientsListComponent, ClientsFormComponent],
    exports: []

})
export class ClientsModule {
}
