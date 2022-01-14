import React,{ useState, useRef ,useEffect,useContext , useCallback, createContext} from 'react';
import Header from "../components/Header";

import Footer from "../components/Footer";
import TodoList from '../components/TodoList';
import Input from '../components/Input';
import Item from '../components/Item';

import { TodoContextProvider } from "./../contexts/todos";
import { ADD_TODO, TodoContext } from "./../contexts/todos";




class TodoApp extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.todoArr = [];  /* {node: newItemNode, isCompleted: false}; */
    //   this.idCnt = 0;
    //   this.state = {todoItems: this.todoArr};
    //   this.itemNode = React.createRef();
    // }
    
    render() {
        return (
          <TodoContextProvider>
            <div className = "todo-app__root">
                <Header text="todos" />
                <section className = "todo-app__main" >
                    <Input />
                    <TodoList /> 
                </section>
                <Footer  />
            </div>
          </TodoContextProvider>
        );
    }
}


export default TodoApp;
