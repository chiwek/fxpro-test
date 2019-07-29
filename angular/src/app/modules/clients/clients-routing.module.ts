import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientsListComponent} from "./clients-list/clients-list.component";
import {ClientsFormComponent} from "./clients-form/clients-form.component";
import {ClientsViewComponent} from "./clients-view/clients-view.component";

const routes: Routes = [
    {path: "list", component: ClientsListComponent},
    {path: "form", component: ClientsFormComponent},
    {path: "view", component: ClientsViewComponent},
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientsRoutingModule {
}
