import {createReducer, on} from '@ngrx/store';
import {ChangeErrorMessage, LoginFailure, LoginSuccess, Logout, SetUserData} from './auth.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IAuthState} from '../../data/models/authState.model';

export interface AuthState extends EntityState<IAuthState> {
}

export const adapter: EntityAdapter<IAuthState> = createEntityAdapter<IAuthState>();
export const initialState: AuthState = adapter.getInitialState();


const _authReducer = createReducer(initialState,
    on(LoginSuccess, (state, {user}) => {
        return {
            ...state,
            isAuthenticated: true,
            user,
            errorMessage: null,
            status: 1
        };
    }),
    on(SetUserData, (state, {user}) => {
        return {
            ...state,
            user
        };
    }),
    on(LoginFailure, (state, {payload, hasError, status}) => {
        return {
            ...state,
            isAuthenticated: false,
            errorMessage: payload,
            hasError,
            status
        };
    }),
    on(ChangeErrorMessage, (state, {hasError}) => {
        return {
            ...state,
            hasError
        };
    }),
    on(Logout, () => initialState),
);

export function authReducers(state, action) {
    return _authReducer(state, action);
}
