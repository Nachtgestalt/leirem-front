import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from './layout/footer/footer.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    BreadcrumbComponent
  ],
  exports: [
    FooterComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
