import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NeedAuthGuard} from "./utils/guards/need-auth.guard";
import {CheckRolePermissionGuard} from "./utils/guards/check-role-permission.guard";
import {LoginComponent} from "./modules/template/login/login.component";


const routes: Routes = [

    {
        path: "staff",
        loadChildren: "../app/modules/staff/staff.module#StaffModule",
        canActivate: [NeedAuthGuard, CheckRolePermissionGuard]
    },
    /*
    {
        path: "clients",
        loadChildren: "../app/modules/products/clients.module#clientsModule",
        canActivate: [NeedAuthGuard, CheckRolePermissionGuard]
    },
    {
        path: "products",
        loadChildren: "../app/modules/products/products.module#productsModule",
        canActivate: [NeedAuthGuard, CheckRolePermissionGuard]
    },
    */
    {
        path: "",
        component: LoginComponent

    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [NeedAuthGuard, CheckRolePermissionGuard]
})
export class AppRoutingModule {
}
