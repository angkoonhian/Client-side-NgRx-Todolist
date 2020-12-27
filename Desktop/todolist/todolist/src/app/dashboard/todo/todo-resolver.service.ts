import { Injectable } from "@angular/core";
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
  } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

import { Todos } from '../../shared-components/todos.model';
import * as fromApp from '../../store/app.reducer';
import * as TodoActions from '../store/todo.actions';

@Injectable({ providedIn: 'root'})

// This entire section is for linking up with firebase.
// But since we are only using firebase for authentication 
// and not storing data, this is irrelevant for now.

export class TodoResolverService implements Resolve<Todos[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {}

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new TodoActions.GetTodo());
        return this.actions$.pipe(
            ofType(TodoActions.Set_todos),
            take(1)
        )
    }
}