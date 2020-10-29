import React, { FC } from "react";
import { IProps } from "../models/IProps";
import { ITodo } from "../models/ITodo";
import Todo from "./todo";

const Todolist:FC<IProps> = ({todoList}:IProps) => {
    console.log(todoList)
    const createTodos = (todoList:ITodo[] | any):void =>{
        return todoList.map((e:ITodo,i:number)=>{
return <Todo key={i} todo={e} numOfTodos={i}/>
        })
    }
    return (
        <div>todo list works
            {createTodos(todoList)}
        </div>
    );
}

export default Todolist;