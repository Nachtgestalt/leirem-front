import {createAction, props} from '@ngrx/store';
import {IUser} from '../../data/models/user.interface';
import {AuthState} from './auth.reducers';

export enum EAuthActions {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  SET_USER_DATA = '[Auth] Set user data',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
}


export const Login = createAction(EAuthActions.LOGIN, props<{ user: IUser }>());
export const LoginSuccess = createAction(EAuthActions.LOGIN_SUCCESS, props<{ authStatus: AuthState, username: string }>());
export const SetUserData = createAction(EAuthActions.SET_USER_DATA, props<{ user: IUser }>());
export const LoginFailure = createAction(EAuthActions.LOGIN_FAILURE, props<{ payload?: any, hasError?: boolean }>());
export const Logout = createAction(EAuthActions.LOGOUT);
