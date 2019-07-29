import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductsFormComponent} from "./products-form/products-form.component";
import {ProductsViewComponent} from "./products-view/products-view.component";

const routes: Routes = [
    {path: "list", component: ProductsListComponent},
    {path: "form", component: ProductsFormComponent},
    {path: "view", component: ProductsViewComponent},
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
export class ProductsRoutingModule {
}
