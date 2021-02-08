import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login.component';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
