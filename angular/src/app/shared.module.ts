import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CanDirective} from "./directives/can.directive";
import {CanUrlDirective} from "./directives/can-url.directive";
import {ListSortDirective} from "./directives/list-sort.directive";


@NgModule({
    declarations: [
        CanDirective,
        CanUrlDirective,
        ListSortDirective,
    ],
    exports: [
        CanDirective,
        CanUrlDirective,
        ListSortDirective,
        AngularFontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})
export class SharedModule {
}
