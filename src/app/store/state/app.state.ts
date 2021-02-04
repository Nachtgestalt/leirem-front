import {IAuthState, initialAuthState} from './auth.state';
import {createFeatureSelector} from '@ngrx/store';

export interface IAppState {
  authState: IAuthState;
  // user: IUserState;
}

export const initialAppState: IAppState = {
  authState: initialAuthState,
  // user: initialUserState,
  // setup: initialSetupState
};

export function getInitialState(): IAppState {
  return initialAppState;
}

export const selectAuthState = createFeatureSelector<IAppState>('authState');
// export const selectCartState = createFeatureSelector<IAppState>('cart');
// export const selectUserState = createFeatureSelector<IAppState>('user');
// export const selectSetupState = createFeatureSelector<IAppState>('setup');
