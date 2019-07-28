import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';
import {ToastComponent} from './toast/toast.component';
import {LoginComponent} from './login/login.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {OptionsComponent} from './options/options.component';
import {LoadingComponent} from './loading/loading.component';
import {ErrorComponent} from './error/error.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginationComponent} from "./pagination/pagination.component";
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [ToastComponent, LoginComponent, ConfirmComponent, OptionsComponent, LoadingComponent, ErrorComponent, PaginationComponent, SidebarComponent, NavigationComponent],
    imports: [
        CommonModule,
        AngularFontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        InlineSVGModule,
        RouterModule
    ],
    exports: [
        ConfirmComponent,
        ErrorComponent,
        LoadingComponent,
        LoginComponent,
        OptionsComponent,
        ToastComponent,
        PaginationComponent,
        SidebarComponent,
        NavigationComponent,
    ]
})
export class TemplateModule {
}
