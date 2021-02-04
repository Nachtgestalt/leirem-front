import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {IAppState} from '../state/app.state';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Login, LoginFailure, LoginSuccess, Logout} from '../actions/auth.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private store: Store<IAppState>) {
  }

  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType(Login),
    switchMap((payload: any) => {
      return of(LoginSuccess({user: {accessToken: null, id: 1, username: 'kmt', refreshToken: '', status: 1}}));
      // return this.authService.login(payload.user.email, payload.user.password)
      //   .pipe(
      //     map((user: any) => {
      //       if (user.status === 0) {
      //         return LoginFailure({payload: 'Favor de verificar tu cuenta', status: user.status});
      //       } else {
      //         return LoginSuccess({user});
      //       }
      //     }),
      //     catchError(err => {
      //       if (err.error && err.error.status === 0) {
      //         return of(LoginFailure({payload: 'Favor de verificar tu cuenta', status: err.error.status}));
      //       }
      //       return of(LoginFailure({payload: 'Usuario y/o contraseña invalidos', hasError: true}));
      //     })
      //   );
    })
  );

  @Effect({dispatch: false})
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(LoginSuccess),
    withLatestFrom(this.store.select(state => state.authState)),
    tap((data) => {
      localStorage.setItem('authState', JSON.stringify(data[1]));
      localStorage.setItem('token', data[0].user.accessToken);
      localStorage.setItem('refreshToken', data[0].user.refreshToken);
    })
  );

  @Effect({dispatch: false})
  public LogOut: Observable<any> = this.actions$.pipe(
    ofType(Logout),
    switchMap((user: any) => {
      return this.authService.logout(user).pipe(
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('authState');
        })
      );
    }),
  );
}
