import { Action } from '@ngrx/store';

import { Todos } from './../../shared-components/todos.model';

// Basic states required for this Todo part of this application

export const Get_Todos = 'GET_TODO';
export const Set_todos = 'SET_TODO';
export const Add_todo = 'ADD_TODO';
export const Update_todo = 'UPDATE_TODO';
export const Delete_todo = 'DELETE_TODO';
export const Start_edit = 'START_EDIT';
export const Stop_edit = 'STOP_EDIT';

export class GetTodo implements Action {
    readonly type = Get_Todos;
}
/* 
* Add state, takes in new Todo object as payload, add to todo.
*/  
export class AddTodo implements Action {
    readonly type = Add_todo;

    constructor(public payload: Todos) {}
}
/* 
* Update state that takes in a new Todo object as payload.
*/  
export class UpdateTodo implements Action {
    readonly type = Update_todo;

    constructor(public payload: Todos) {}
}
/* 
* Deleting state, takes in index of todo as payload.
*/  
export class DeleteTodo implements Action {
    readonly type = Delete_todo;

    constructor(public payload: number) {}
}
/* 
* Start of editing state, takes in index of todo as payload.
*/  
export class StartEdit implements Action {
    readonly type = Start_edit;
  
    constructor(public payload: number) {}
}

/* 
* Stop editing state, convert start edit to stop.
*/  
export class StopEdit implements Action {
    readonly type = Stop_edit;
}
/* 
* Originally planning for database but since we are using
* Client side to store data, this is not as important but 
* still keep in case next time want to expand on it.
*/
export class SetTodo implements Action {
    readonly type = Set_todos;

    constructor(public payload: Todos[]) {}
}
// NgRx stuff, allow actions to be used in reducers.
export type TodoActions = 
| GetTodo
| SetTodo
| AddTodo
| UpdateTodo
| DeleteTodo
| StartEdit
| StopEdit