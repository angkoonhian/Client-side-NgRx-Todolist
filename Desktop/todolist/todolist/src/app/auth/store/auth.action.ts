import { Action } from '@ngrx/store';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: {
        email: string;
        userId: string;
        token: string;
        expirationDate: Date;
        }
    ) {}
}
// state when we logout
export class Logout implements Action {
    readonly type = LOGOUT;
}
// State when we start logging in
export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {
        email: string;
        password: string;
    }) {}
}
// state when we fail to login
export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string) {}
}
// state when we want to clear login fail error
export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}
// state when we auto login.
export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

// To allow auth reducer to use their respective actions.
export type AuthActions = 
    | Login 
    | Logout 
    | LoginStart 
    | LoginFail
    | ClearError
    | AutoLogin;