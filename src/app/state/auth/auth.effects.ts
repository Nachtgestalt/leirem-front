import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {Login, LoginFailure, LoginSuccess, Logout, SetUserData} from './auth.actions';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../../core/services/auth.service';
import {UserService} from '../../data/services/user.service';
import {SeasonService} from '../../data/services/season.service';
import {AppState} from '../index';
import {AuthState} from './auth.reducers';

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => this.actions$.pipe(
        ofType(Login),
        switchMap(({user}: any) => {
            const {username, password} = user;
            return this.authService.login(username, password)
                .pipe(
                    map((token: any) => {
                        if (!token) {
                            return LoginFailure({payload: 'Favor de verificar tu cuenta'});
                        } else {
                            const authState: AuthState = {
                                status: 1,
                                token,
                                isAuthenticated: true
                            };
                            return LoginSuccess({authStatus: authState, username});
                        }
                    }),
                    catchError(err => {
                        if (err.error && err.error.status === 0) {
                            return of(LoginFailure({
                                payload: 'Favor de verificar tu cuenta',
                            }));
                        }
                        return of(LoginFailure({payload: 'Usuario y/o contraseña invalidos', hasError: true}));
                    })
                );
        })
    ));


    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(LoginSuccess),
        tap(({authStatus}) => {
            localStorage.setItem('token', authStatus.token);
        }),
        mergeMap(({authStatus, username}) =>
            forkJoin([
                    this.userService.getUser(username)
                        .pipe(
                            map((userResponse: any) => {
                                console.log(userResponse);
                                this.store.dispatch(SetUserData({user: userResponse}));
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
    ), {dispatch: false});

//     @Effect({dispatch: false})
//     LogInSuccess: Observable<any> = this.actions$.pipe(
//         ofType(LoginSuccess),
//         // withLatestFrom(this.state.select(state => state.authState)),
//         tap(({user}) => {
//             console.log(user);
//             localStorage.setItem('authState', JSON.stringify(user));
//             localStorage.setItem('token', user.accessToken);
//         }),
//         mergeMap(({authStatus, username}) =>
//             forkJoin([
//                     this.userService.getUser(username)
//                         .pipe(
//                             map((userResponse: any) => {
//                                 const userData = {
//                                     ...user,
//                                     ...userResponse
//                                 };
//                                 console.log(userResponse);
//                                 this.store.dispatch(SetUserData({user: {...userData}}));
//                             })
//                         ),
//                     this.seasonService.getCurrentSeason()
//                         .pipe(
//                             tap((season) => {
//                                 console.log(season);
//                                 localStorage.setItem('season', JSON.stringify(season));
//                             }),
//                         )
//                 ]
//             )
//         )
//     );
// );
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

    constructor(private actions$: Actions,
                private authService: AuthService,
                private userService: UserService,
                private seasonService: SeasonService,
                private store: Store<AppState>,
                private router: Router) {
    }
}
