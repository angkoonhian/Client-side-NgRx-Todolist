import { Todos } from './../../shared-components/todos.model';
import * as todos from './todo.actions';

export interface State {
    Todos: Todos[];
    editedTodo: Todos;
    editedTodoIndex: number;
}

/* 
*  Initial state of todos is from local storage to ensure persistant state
*  There is no editing going on thus it is null and -1.
*/ 
const initialState: State = JSON.parse(localStorage.getItem('todo'));
if (initialState.Todos.length == 0) {
    initialState.Todos = [];
}

export function TodoReducer(
    state: State = initialState,
    action: todos.TodoActions
) {
    // use switch case 
    switch (action.type) {
        // Did not separate add text and add image since can be grouped
        // under a single add-todo state. separating it is redundant.
        case todos.Add_todo:
            console.log("adding");
            return {
                ...state,
                Todos: [...state.Todos, action.payload]
            };
        // I did not separate update-text and update-image because
        // both can be achieved via a single update state. separating it 
        // is redundant.
        case todos.Update_todo:
            const todo = state.Todos[state.editedTodoIndex];
            const updatedTodo = {
                ...todo,
                ...action.payload
            };
            const updatedTodos = [...state.Todos];
            updatedTodos[state.editedTodoIndex] = updatedTodo;
            // reset the states but with new set of todos
            // reset edit todo back to null and index to -1.
            return {
                ...state,
                Todos: updatedTodos,
                editedTodoIndex: -1,
                editedTodo: null
            }
        // When state changes to delete, return a state with todos 
        // that are appropriately filtered.
        case todos.Delete_todo:
            const deletedId = action.payload;
            return {
                ...state,
                Todos: state.Todos.filter((todoValue, todoIndex, arr) => {
                    return todoIndex !== deletedId;
                }),
                editedTodoIndex: -1,
                editedTodo: null
            };
        // Once editing state starts, change editedTodoIndex to
        // action payload to edit correct set of todo.
        case todos.Start_edit:
            return {
                ...state,
                editedTodoIndex: action.payload,
                editedTodo: {
                    ...state.Todos[action.payload]
                }
            };
        // Once editing state stops, change editedTodoIndex and
        // editedTodo back to their default values.
        case todos.Stop_edit:
            return {
                ...state,
                editedTodoIndex: -1,
                editedTodo: null
            };
        // default to handle exceptions when no state is valid.
        default:
            return state;
    }
}