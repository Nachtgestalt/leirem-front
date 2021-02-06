import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {MaterialModule} from '../../core/material/material.module';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminModule {
}
