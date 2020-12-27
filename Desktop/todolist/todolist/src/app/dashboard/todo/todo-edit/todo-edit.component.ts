import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Todos } from '../../../shared-components/todos.model';
import * as TodoActions from '../../store/todo.actions';
import * as fromApp from '../../../store/app.reducer';
import { file } from 'jszip';

@Component({
    selector: 'app-todo-edit',
    templateUrl: './todo-edit.component.html',
    styleUrls: ['./todo-edit.component.css']
})

export class TodoEditComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    editMode = false;
    editedItem: Todos;

    //Declaring a form group
    TodoForm: FormGroup

    //Declare variable to store Image
    Image:any;

    constructor(
        private store: Store<fromApp.AppState>,
        private fb: FormBuilder
    ) {
        this.TodoForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(1)]],
            Category: ['', [Validators.required, Validators.minLength(1)]],
            Details: ['', [Validators.required, Validators.minLength(1)]],
            Image: [file]
        })
    }

    // initialise this component by filling up existing values.
    ngOnInit() {
        this.subscription = this.store
            .select('Todos')
            .subscribe(stateData => {
                // Make sure its a valid index to edit
                if (stateData.editedTodoIndex > -1) {
                    this.editMode = true;
                    this.editedItem = stateData.editedTodo;
                    // Prepopulate form with values from state
                    this.TodoForm.setValue({
                        name: this.editedItem.name,
                        Category: this.editedItem.category,
                        Details: this.editedItem.details,
                        Image: ''
                    });
                } else {
                    this.editMode = false;
                }
            })
        
    }

    //Function to handle submission of Image file
    fileChanged(e) {
        this.Image = e.target.files[0];
        console.log(this.Image);
    }

    // submit function to dispatch new updateTodo state with form values.
    onSubmit(TodoForm) {
        const value = TodoForm.value;
        const reader = new FileReader();
        var ImageData: string | ArrayBuffer

        reader.addEventListener("load", () => {
            ImageData = reader.result;
            // Create new todo with input values from form
            const newTodo = new Todos(
                'local',
                value.name,
                value.Details,
                value.Category,
                false,
                ImageData
            );
            
            // if it is in edit mode, dispatch update action via ngrx
            if (this.editMode) {
                console.log("updating");
                this.store.dispatch(
                    new TodoActions.UpdateTodo(newTodo)
                );
            }
            this.editMode = false;
            TodoForm.reset();
            // get Todos from store and convert to string to store in local storage
            const newTodos = this.store.select('Todos')
                .subscribe(todos => {
                    localStorage.setItem('todo', JSON.stringify(todos));
                })
        })
        console.log(ImageData);
        const imgData = reader.readAsDataURL(this.Image);
        
    }

    // to stop edit state and clear form.
    onClear() {
        this.TodoForm.reset();
        this.editMode = false;
        this.store.dispatch(new TodoActions.StopEdit());
    }

    // unsubscribe from this.subscription to end this edit state.
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(new TodoActions.StopEdit());
    }
}