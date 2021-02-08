import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {PageNotFoundComponent} from '../../core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, data: {breadcrumb: 'Inicio'}},
      {
        path: 'clientes',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
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
