import {ActionReducerMap} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {authReducers} from './auth.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  authState: authReducers,
  // user: userReducer,
  // setup: setupReducer
};
