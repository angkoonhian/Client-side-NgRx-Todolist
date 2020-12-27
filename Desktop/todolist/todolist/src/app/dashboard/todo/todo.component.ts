import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';

import { Todos } from '../../shared-components/todos.model';
import * as TodoActions from '../store/todo.actions';
import * as fromApp from '../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { forEach } from 'jszip';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

   /*  
  *  Default image url, if task has no image tagged to it
  */
 DefaultUrl = "https://material.angular.io/assets/img/examples/shiba2.jpg";

  /* 
  * Set default Todo when a new empty Todo is added.
  */
  newTodo = {
    user: 'koonhian', 
    name: 'dog',
    details: 'bring mao mao to walk', 
    category: 'pet',  
    completed: false,
    image: this.DefaultUrl
  }

  /*  
  *  UserId tagged to Todos
  */
  UserId: string;
  /*  
  *  Get array of observable Todo items tagged to user but as observable for reducer
  */
  Todos: Observable<{Todos: Todos[]}>;
  localTodo: string;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.Todos = this.store.select('Todos');
  }
/* 
* Add new todo into todo list and update local storage with new todo list
*This is to allow persistant state, call storeLocally().
*/
  addTodo() {
    this.store.dispatch(new TodoActions.AddTodo(this.newTodo));
    this.storeLocally();
    console.log(this.localTodo);
  }

  onEditTodo(index: number) {
    console.log(index);
    this.store.dispatch(new TodoActions.StartEdit(index));
    this.store.select('Todos').subscribe(res => {
      console.log(res.editedTodoIndex);
    })
  }
/* 
* Delete todo from todo list and update local storage with new todo list
*This is to allow persistant state, call storeLocally().
*/
  deleteTodo(index: number) {
    this.store.dispatch(new TodoActions.DeleteTodo(index));
    this.storeLocally();
  }

  /* 
  * Function to help in the process of storing todo list in local storage
  */
  public storeLocally() {
    this.Todos.subscribe(todos => {
      console.log(todos);
      this.localTodo = JSON.stringify(todos);
    })
    localStorage.setItem('todo', this.localTodo);
  }

  /*  
  *  destroy life cycle for unsubscribing. But since using ngrx, no need for this.
  */
  ngOnDestroy() {}

}
