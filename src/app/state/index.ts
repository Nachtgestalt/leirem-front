import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducers';

export interface AppState {
    auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducers,
};
