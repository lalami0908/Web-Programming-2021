import React,{ useState, useRef ,useEffect,useContext , useCallback, createContext} from 'react';
import TodoApp from '../containers/TodoApp';
import x from '../img/x.png';
import { VisibilityFilters,DELECTE_TODO, TOGGLE_TODO, TodoContext } from "./../contexts/todos";
// class Item extends React.Component {
      
//     constructor(props) {
//         super(props);
//         this.state = { isCompleted: this.props.checked, 
//                        content: this.props.content};
      
//     }
//     render() {

//         return (
//             <li className = "todo-app__item">
//                 <div className = "todo-app__checkbox">
//                     <input id = {this.props.id} type = "checkbox" checked = {this.props.checked} onChange = {this.props.check}></input>
//                     <label htmlFor = {this.props.id}></label>
//                 </div>
//                 <h1 className = "todo-app__item-detail"  style = {this.props.style} >{this.state.content}</h1>
//                 <img src = {x} className = "todo-app__item-x" onClick = {this.props.del} id = {this.props.id}/>
//             </li>      
//         );

//     }
// }

function Item({ id, completed, text }){
    const { dispatch } = useContext(TodoContext);
    return (
      <li className = "todo-app__item">
        <div className = "todo-app__checkbox">
          <input id = {id} 
                type="checkbox" 
                checked = {completed} 
                onChange = {
                  () => dispatch({
                  type: TOGGLE_TODO,
                  payload: { id, completed: !completed }
                })
                } />
          <label htmlFor = {id}></label>
        </div>
        <h1 className = "todo-app__item-detail"  
            style={{
              cursor: "pointer",
              textDecoration: completed ? "line-through" : "none"
            }}
            id = {id} > {text} </h1>
         <img id = {id}
              src = {x} 
              className = "todo-app__item-x" 
              onClick={() =>
              dispatch({
                type: DELECTE_TODO,
                payload: { id }
              })
            }/>
      </li>
    );
  }
  
export default Item;