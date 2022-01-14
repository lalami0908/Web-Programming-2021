import React, { useContext } from "react";
import { VisibilityFilters,CHANGE_FILTER, DELECTE_COMPLETED, TodoContext } from "./../contexts/todos";

// class Footer extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//     render() {
//       return (
//         <footer className = "todo-app__footer" id = "footer"> 
//             <div className = "todo-app__total" id = "leftCount"> 0 left </div>
//                 <ul className = "todo-app__view-buttons" id = "view-state">
//                     <button id = "state_all" onClick = {this.props.filterItem} > All</button>
//                     <button id = "state_active"> Active </button>
//                     <button id = "state_completed"> Completed </button>
//                 </ul>
//             <div className = "todo-app__clean" id = "clear-completed" onClick = "clearCompleted()"> <button> Clear Completed </button> </div>
//         </footer>
//       );
//     }
//   }
const BUTTONS_FILTER = [
  {
    id: 1,
    caption: "All",
    type: CHANGE_FILTER,
    filter: VisibilityFilters.SHOW_ALL
  },
  {
    id: 2,
    caption: "Active",
    type: CHANGE_FILTER,
    filter: VisibilityFilters.SHOW_ACTIVE
  },
  {
    id: 3,
    caption: "Completed",
    type: CHANGE_FILTER,
    filter: VisibilityFilters.SHOW_COMPLETED
  }
];


  const Footer = () => {
    const { state, dispatch } = useContext(TodoContext);
    return (
      <footer className = "todo-app__footer" id = "footer"> 
               <div className = "todo-app__total" id = "leftCount"> { state.todos.length} left </div>

        <ul className = "todo-app__view-buttons" id = "view-state">
        {BUTTONS_FILTER.map(({ id, caption, type, filter }) => (
          
          <button
            disabled={state.filter === filter}
            onClick={() => dispatch({ type, payload: filter })}
            key={id}
          >
            {caption}
          </button>
        ))}
        </ul>
         <div className = "todo-app__clean" id = "clear-completed"  
            onClick = {
              () => dispatch({
              type: DELECTE_COMPLETED
            })}
         > <button> Clear Completed </button> </div>
     </footer>
    );
  };
  export default Footer;