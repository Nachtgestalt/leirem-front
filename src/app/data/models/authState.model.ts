import {IUser} from './user.interface';

export interface IAuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    errorMessage: string | null;
    hasError: boolean;
    status: number;
}
