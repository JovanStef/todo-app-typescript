import React, { FC, ReactNode } from "react";
import { IProps } from "../models/IProps";
import { ITodo } from "../models/ITodo";
import Todo from "./todo";

const Todolist:FC<IProps> = ({todoList}:IProps) => {
    console.log(todoList)
    const createTodos = (todoList:ITodo[] | any):ReactNode =>{
        return todoList.map((e:ITodo,i:number)=>{
return <Todo key={i} todo={e} numOfTodos={i}/>
        })
    }
    return (
        <div className="todo-list d-flex flex-wrap">
            {createTodos(todoList)}
        </div>
    );
}

export default Todolist;