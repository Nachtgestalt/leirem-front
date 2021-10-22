import {ActionReducerMap} from '@ngrx/store';
import * as fromAuth from './auth/auth.reducers';
import * as fromSeason from './season/season.reducers';

export interface AppState {
    auth: fromAuth.AuthState;
    season: fromSeason.SeasonsState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducers,
    season: fromSeason.seasonReducers
};
