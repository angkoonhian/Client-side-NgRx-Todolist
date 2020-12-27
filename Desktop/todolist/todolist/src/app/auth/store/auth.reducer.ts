import { User } from '../user.model';
import * as AuthActions from './auth.action';

export interface State {
    user: User;
    authError: string;
}

const initialState: State = {
    user: null,
    authError: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate);
                return {
                    ...state,
                    authError: null,
                    user: user
                }
        case AuthActions.LOGOUT:
            // Once logout, revert state to one with no user.
            return {
                ...state,
                user: null
            }
        case AuthActions.LOGIN_START:
            // revert autherror back to null since we got chance to get new error.
            return {
                ...state,
                authError: null
            }
        case AuthActions.LOGIN_FAIL:
            // If fail, we give autherror a new string but user is null
            return {
                ...state,
                user: null,
                authError: action.payload
            }
        case AuthActions.CLEAR_ERROR:
            // state to clear error after failed login, revert authError to null
            return {
                ...state,
                authError: null
            }

        default:
            return state;
    }
}