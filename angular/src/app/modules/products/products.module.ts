import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import {InlineSVGModule} from "ng-inline-svg";
import {SharedModule} from "../../shared.module";
import {TemplateModule} from "../template/template.module";
import {ProductsRoutingModule} from "./products-routing.module";

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        InlineSVGModule,
        SharedModule,
        TemplateModule,
    ],
  declarations: [ProductsViewComponent, ProductsListComponent, ProductsFormComponent]
})
export class ProductsModule { }
