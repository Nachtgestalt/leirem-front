import {createReducer, on} from '@ngrx/store';
import {LoginSuccess, Logout} from './auth.actions';

export const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    status: null
};

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    status: number | null;
}

const _authReducer = createReducer(initialState,
    on(LoginSuccess, (state, {authStatus}) => {
        return {
            ...state,
            status: 1,
            isAuthenticated: authStatus.isAuthenticated,
            token: authStatus.token
        };
    }),
    // on(SetUserData, (state, {user}) => {
    //     return {
    //         ...state,
    //         user
    //     };
    // }),
    // on(LoginFailure, (state, {payload, hasError, status}) => {
    //     return {
    //         ...state,
    //         isAuthenticated: false,
    //         errorMessage: payload,
    //         hasError,
    //         status
    //     };
    // }),
    // on(ChangeErrorMessage, (state, {hasError}) => {
    //     return {
    //         ...state,
    //         hasError
    //     };
    // }),
    on(Logout, () => initialState),
);

export function authReducers(state, action) {
    return _authReducer(state, action);
}
