import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../../state/state/app.state';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authState: Observable<any>;

  constructor(private router: Router,
              private store: Store<IAppState>) {
    this.authState = this.store.select('authState');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authState.pipe(
      map(({isAuthenticated}) => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }

}
