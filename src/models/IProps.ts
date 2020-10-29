import { ITodo } from "./ITodo";

export interface IProps{
todoList?:ITodo[],
todo?:ITodo,
todoFromChild?:any
}

export interface IPropsTodo{
    numOfTodos?:number,
    todo?:ITodo,
    }