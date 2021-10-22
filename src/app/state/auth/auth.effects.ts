import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {Login, LoginFailure, LoginSuccess, Logout, SetUserData} from './auth.actions';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../../core/services/auth.service';
import {UserService} from '../../data/services/user.service';
import {IUser} from '../../data/models/user.interface';
import {SeasonService} from '../../data/services/season.service';
import {AppState} from "../index";

@Injectable()
export class AuthEffects {
  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType(Login),
    switchMap(({user}: any) => {
      const {username, password} = user;
      // return of(LoginSuccess({user: {accessToken: null, id: 1, username: 'kmt', refreshToken: '', status: 1}}));
      return this.authService.login(username, password)
        .pipe(
          map((token: any) => {
            console.log(token);
            if (!token) {
              return LoginFailure({payload: 'Favor de verificar tu cuenta', status: 0});
            } else {
              const userData: IUser = {
                username,
                accessToken: token,
                status: 1,
                refreshToken: ''
              };
              return LoginSuccess({user: userData});
            }
          }),
          catchError(err => {
            if (err.error && err.error.status === 0) {
              return of(LoginFailure({payload: 'Favor de verificar tu cuenta', status: err.error.status}));
            }
            return of(LoginFailure({payload: 'Usuario y/o contraseña invalidos', hasError: true}));
          })
        );
    })
  );
  @Effect({dispatch: false})
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(LoginSuccess),
    // withLatestFrom(this.state.select(state => state.authState)),
    tap(({user}) => {
      console.log(user);
      localStorage.setItem('authState', JSON.stringify(user));
      localStorage.setItem('token', user.accessToken);
    }),
    mergeMap(({user}) =>
      forkJoin([
          this.userService.getUser(user.username)
            .pipe(
              map((userResponse: any) => {
                const userData = {
                  ...user,
                  ...userResponse
                };
                console.log(userResponse);
                this.store.dispatch(SetUserData({user: {...userData}}));
              })
            ),
          this.seasonService.getCurrentSeason()
            .pipe(
              tap((season) => {
                console.log(season);
                localStorage.setItem('season', JSON.stringify(season));
              }),
            )
        ]
      )
    )
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private userService: UserService,
              private seasonService: SeasonService,
              private store: Store<AppState>,
              private router: Router) {
  }

  @Effect({dispatch: false})
  public LogOut: Observable<any> = this.actions$.pipe(
    ofType(Logout),
    tap(() => {
      localStorage.removeItem('token');
      // localStorage.removeItem('refreshToken');
      // localStorage.removeItem('authState');
      this.router.navigate(['/']);
    })
  );
}
