import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StaffListComponent} from "./staff-list/staff-list.component";
import {StaffFormComponent} from "./staff-form/staff-form.component";
import {StaffViewComponent} from "./staff-view/staff-view.component";

const routes: Routes = [
    {path: "list", component: StaffListComponent},
    {path: "form", component: StaffFormComponent},
    {path: "view", component: StaffViewComponent},
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
export class StaffRoutingModule {
}
