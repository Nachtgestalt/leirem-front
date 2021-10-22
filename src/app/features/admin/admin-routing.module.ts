import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/page/dashboard/dashboard.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {PageNotFoundComponent} from '../../shared/components/page-not-found/page-not-found.component';
import {ContentLayoutComponent} from '../../layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, data: {breadcrumb: 'Inicio'}},
      {
        path: 'clientes',
        loadChildren: () => import('../clients/clients.module').then(m => m.ClientsModule),
        data: {breadcrumb: 'Clientes'}
      },
      {path: '404', component: PageNotFoundComponent},
      {path: '**', redirectTo: '/404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
