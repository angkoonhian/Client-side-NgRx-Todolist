import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as TodoActions from './todo.actions';
import { Todos } from './../../shared-components/todos.model';

@Injectable()

export class TodoEffects {
    @Effect()
    //Gettodo is to make request to firebase but i've decided
    // to use local storage for storing data but i did not delete this.
    getTodo = this.actions$.pipe(
        ofType(TodoActions.Get_Todos),
        switchMap(() => {
            return this.http.get<Todos[]>(
                'https://todolist-de606-default-rtdb.firebaseio.com/todo.json'
            );
        }),
        map(Todos => {
            return Todos.map(Todo => {
                return {
                    ...Todo
                };
            });
        }),
        map(Todos => {
            return new TodoActions.SetTodo(Todos)
        })
    )

    constructor(private actions$: Actions, private http: HttpClient) {}
}