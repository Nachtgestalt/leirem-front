import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './features/auth/page/login/login.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";

const routes: Routes = [
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
    {
        path: '',
        component: ContentLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'clientes',
                loadChildren: () =>
                    import('./features/clients/clients.module').then(m => m.ClientsModule)
            },
        ]
    },
    {
        path: 'auth',
        component: LoginComponent,
        loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
    },

    // {path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)},
    {path: '**', redirectTo: '/auth/login', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
