import React,{ useState, useRef ,useEffect,useContext , useCallback, createContext} from 'react';
import Item from './Item';

import { VisibilityFilters, TodoContext } from "./../contexts/todos";



const TodoList = () => {
  const { state } = useContext(TodoContext);
  const todos = applyFilter(state);
  return (
    <ul className = "todo-app__list" id = "todo-list">
      {todos.map(todo => (
        <Item key={todo.id} {...todo} />
      ))}
    </ul>

  );
};

const applyFilter = state => {
  const { filter, todos } = state;
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};


// class TodoList extends React.Component {
//     constructor(props) {
//         super(props);
//       }
    
//     render() {
//       return (
//         <ul className = "todo-app__list" id = "todo-list">
//             {this.props.list.map(
//                 e => e.node 
//             )}
//             {/* {this.props.list} */}
//         </ul>
//       );
//     }
//   }

export default TodoList;