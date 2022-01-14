import React, { useReducer, createContext } from "react";
// import toDoReducer, { VisibilityFilters } from "./../reducers/todos";

export const CHANGE_FILTER = "CHANGE_FILTER";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const ADD_TODO = "ADD_TODO";
export const DELECTE_TODO = "DELECTE_TODO";
export const DELECTE_COMPLETED = "DELECTE_COMPLETED";


export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

const toDoReducer = (state, { type, payload }) => {
  switch (type) {
    case DELECTE_COMPLETED:{
      const todos = [...state.todos];
      for (var i = 0 ; i < todos.length; i++) {
        if(todos[i].completed === true){
          todos.splice(i,1);
        }	
      }
      return { ...state, todos };
    }
      
    case CHANGE_FILTER:
      return { ...state, filter: payload };
    case TOGGLE_TODO: {
      const todos = state.todos.map(todo =>
        todo.id === payload.id ? { ...todo, ...payload } : todo
      );
      return { ...state, todos };
    }
    case DELECTE_TODO: {
      const todos = [...state.todos];
      for (var i = 0 ; i < todos.length; i++) {
        if(todos[i].id === payload.id){
          todos.splice(i,1);
          break;
        }	
      }
      
      return { ...state, todos};
    }
    case ADD_TODO: {
      const todos = [...state.todos, payload];
      return { ...state, todos };
    }
    default:
      return state;
  }
};


const TodoContext = createContext();

const initialState = {
  filter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function TodoContextProvider(props) {
  const [state, dispatch] = useReducer(toDoReducer, initialState);
  const value = { state, dispatch };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}
export { TodoContext, TodoContextProvider };
