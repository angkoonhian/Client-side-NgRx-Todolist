import { ActionReducerMap } from '@ngrx/store';

import * as fromTodos from './../dashboard/store/todo.reducer';
import * as fromAuth from './../auth/store/auth.reducer';

export interface AppState {
    Todos: fromTodos.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    Todos: fromTodos.TodoReducer,
    auth: fromAuth.authReducer
}


// This file merges all other reducers and Appstates together