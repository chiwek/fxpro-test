import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {UserService} from "./services/user/user.service";
import {ApiService} from "./services/api/api.service";
import {ModalService} from "./services/frontend/modal.service";
import {ToastService} from "./services/frontend/toast.service";
import {TemplateService} from "./services/frontend/template.service";
import {GlobalService} from "./services/user/global.service";
import {TemplateModule} from "./modules/template/template.module";
import {SharedModule} from "./shared.module";
import {AuthService} from "./services/api/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import locale from '@angular/common/locales/en';
import localeExtra from '@angular/common/locales/extra/en';


registerLocaleData(locale, 'en-US', localeExtra);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        TemplateModule,
        InlineSVGModule.forRoot()

    ],
    providers: [UserService, ApiService, ModalService, ToastService, TemplateService, ToastService, GlobalService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
