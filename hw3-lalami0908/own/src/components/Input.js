import React,{ useState, useRef ,useEffect,useContext , useCallback, createContext} from 'react';
import TodoApp from '../containers/TodoApp';
import { ADD_TODO, TodoContext } from "./../contexts/todos";

  
export default ({press}) => {
  //  const input = useRef(null);

    const { dispatch } = useContext(TodoContext);
    const [ nextTodoId, setIndex ] = useState(1);
    const input = useFromInput("");
    const { resetValue, ...inputProp } = input;

    return (<div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            dispatch({
              type: ADD_TODO,
              payload: {
                id: nextTodoId,
                completed: false,
                text: input.value
              }
            });
            setIndex(nextTodoId + 1);
            resetValue();
          }}
        >
          <input  type="text" className = "todo-app__input"   placeholder="What needs to be done?" {...inputProp} />
        </form>
      </div>);
}

function useFromInput(initValue = "") {
    const [value, setValue] = useState(initValue);
    const onChange = e => setValue(e.target.value);
    const resetValue = newValue => setValue(newValue || initValue);
    return { value, onChange, resetValue };
}
